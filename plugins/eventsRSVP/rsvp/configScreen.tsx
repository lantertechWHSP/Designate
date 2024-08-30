import { Canvas, FieldGroup, ButtonGroup, Button, Dropdown, DropdownMenu, DropdownOption, DropdownSeparator } from 'datocms-react-ui';
import { useEffect, useState, useRef } from 'react';
import 'datocms-react-ui/styles.css';
import './configScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { buildClient } from '@datocms/cma-client-browser';
import { IEvent } from '~/interfaces/models/event';
import { Alert } from '~/plugins/eventsRSVP/alert/alert';

type PropTypes = {
    ctx: any;
};

const EventsRSVPConfigScreen = ({ ctx }: PropTypes) : any => {
    const [events, setEvents] = useState([]);

    const [allEventRSVPItems, setAllEventRSVPItems] = useState([]); // All the Event RSVP’s
    const [displayedEventRSVPItems, setDisplayedEventRSVPItems] = useState([]); // Paginated display of the Event RSVP’s

    // RSVP id’s
    const [rsvps, setRSVPs] = useState(ctx.formValues.rsvp);

    // API handling
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Paggination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage:number = 5;
    const [totalItems, setTotalItems] = useState(0);

    // Table
    const itemsTableRef = useRef();

    // DatoCMS build Client
    const client = buildClient({
        apiToken: ctx.currentUserAccessToken,
        environment: ctx.environment
    });

    useEffect(() => {
        if(ctx.formValues.events) {
            setErrorMessage('');

            client.items.list({
                filter: {
                    ids: ctx.formValues.events.join(','),
                    type: 'event'
                },
            }).then((events) => {
                setEvents(events);

                if(ctx.formValues.rsvp) {
                    // alert('Invoking!');

                    loadRsvpEvents(currentPage, () => {
                        setIsLoaded(true);
                    });

                    (async () => {
                        const allItems:any = [];

                        try {
                            // Load all the items
                            for await (
                                const record of client.items.listPagedIterator({
                                    filter: {
                                        type: 'event_rsvp',
                                        fields: {
                                            event_bundle: {
                                                eq: ctx.itemId
                                            }
                                        },
                                    },
                                    order_by: '_createdAt_ASC'
                                },
                                {
                                    concurrency: 10,
                                    perPage: 100
                                })) {
                                allItems.push(record);
                            }

                            setAllEventRSVPItems(allItems);
                            setTotalItems(allItems.length);
                        }
                        catch {
                            setErrorMessage('Could not load RSVP');
                        }
                    })();
                }
            }).catch(() => {
                setErrorMessage('Could not load RSVP');
            });
        }
    }, []);

    const loadRsvpEvents:any = (page:number, callback?:any) => {
        client.items.list({
            page: {
                limit: itemsPerPage,
                offset: (page - 1) * itemsPerPage
            },
            filter: {
                type: 'event_rsvp',
                fields: {
                    event_bundle: {
                        eq: ctx.itemId
                    }
                },
            },
            order_by: '_createdAt_ASC'
        }).then((value) => {
            setDisplayedEventRSVPItems(value);
            if(callback) {
                callback();
            }
        }).catch(() => {
            setErrorMessage('Could not load RSVP');
        });
    };

    const download:any = () : void => {
        if(allEventRSVPItems.length > 0) {
            let CSVString:string = '';
            const title:string = ctx.formValues.title ? `${ctx.formValues.title} — RSVP` : 'RSVP';

            const eventDateLabels = events.map((eventDate:any) => {
                return `Attending ${eventDate.label}`;
            });

            CSVString += ['Name', 'Email', 'Shareholder', ...eventDateLabels].join(',');
            CSVString += "\r\n";

            allEventRSVPItems.map((item) => {
                const eventAttending = events.map((eventDate:any) => {
                    const attending = item.events_attending.find((eventId:string) => {
                        return eventId === eventDate.id;
                    });

                    return attending ? 'Yes' : 'No';
                });

                CSVString += [item.name, item.email, item.is_shareholder ? 'Yes' : 'No', ...eventAttending].join(',');
                CSVString += "\r\n";
            });

            CSVString = "data:application/csv," + encodeURIComponent(CSVString);
            const anchor = document.createElement("A");
            anchor.setAttribute("href", CSVString );
            anchor.setAttribute("download", `${title}.csv`);
            document.body.appendChild(anchor);
            anchor.click();
        }
    };

    const create:any = async () : Promise<void> => {
        // Pass the eventBundleId to sessionStorage for temporary use
        sessionStorage.setItem('soulpatts.dato.eventBundle.id', ctx.itemId);

        const item = await ctx.createNewItem(process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID);

        if (item) {
            const rsvpItem:any = {
                id: item.id,
                name: item.attributes.name,
                email: item.attributes.email,
                is_shareholder: item.attributes.is_shareholder,
                events_attending: item.attributes.events_attending.map((id) => {
                    return id;
                })
            };

            // Add the RSVP item
            const newEventRSVPItems = [...allEventRSVPItems, rsvpItem];
            setAllEventRSVPItems(newEventRSVPItems);
            const newRSVPs = [...rsvps, item.id];
            setRSVPs(newRSVPs);

            // Add the RSVP id to the form value
            await ctx.setFieldValue('rsvp', newRSVPs);

            // Save the record
            await ctx.saveCurrentItem();

            // Reload the display table
            loadRsvpEvents(currentPage);
        }

        // Remove the temporary ID from the sessionStorage
        sessionStorage.removeItem('soulpatts.dato.eventBundle.id');
    };

    const edit:any = async (id:string): Promise<void> => {
        const item = await ctx.editItem(id);
        if(item) {
            const rsvpItem:any = {
                id: item.id,
                name: item.attributes.name,
                email: item.attributes.email,
                is_shareholder: item.attributes.is_shareholder,
                events_attending: item.attributes.events_attending.map((id) => {
                    return id;
                })
            };

            // Update the RSVP item
            const newEventRSVPItems = [...allEventRSVPItems];
            for(let i = 0; i < newEventRSVPItems.length; i++) {
                if(newEventRSVPItems[i].id === rsvpItem.id) {
                    newEventRSVPItems[i] = {
                        ...rsvpItem
                    };
                }
            }

            setAllEventRSVPItems(newEventRSVPItems);

            // Reload the display table
            loadRsvpEvents(currentPage);
        }
    };

    const remove:any = async (id:string): Promise<void> => {
        // Remove the RSVP item
        const newEventRSVPItems = allEventRSVPItems.filter((eventRSVPItem) => {
            return eventRSVPItem.id !== id;
        });

        setAllEventRSVPItems(newEventRSVPItems);
        const newRSVPs = newEventRSVPItems.map((eventRSVPItem) => {
            return eventRSVPItem.id;
        });
        setRSVPs(newRSVPs);

        // Add the RSVP id to the form value
        await ctx.setFieldValue('rsvp', newRSVPs);

        // Save the record
        await ctx.saveCurrentItem();

        // Remove the EventRSVP from the CMS
        await client.items.destroy(id);

        // Reload the display table
        loadRsvpEvents(currentPage);
    };

    return (
        <Canvas ctx={ctx}>
            <FieldGroup>
                {
                    isLoaded ? <>
                        {
                            displayedEventRSVPItems.length > 0 ? <>
                                <div className="ItemsTable" ref={itemsTableRef}>
                                    <div className="ItemsTable__header-row">
                                        <div className="ItemsTable__header-cell ItemsTable__header-cell--name">Name
                                        </div>
                                        <div className="ItemsTable__header-cell ItemsTable__header-cell--email">Email
                                        </div>
                                        <div
                                            className="ItemsTable__header-cell ItemsTable__header-cell--shareholder">Shareholder
                                        </div>
                                        {
                                            events.map((event: IEvent, index: number) => {
                                                return <div key={index} className="ItemsTable__header-cell" style={{
                                                    width: `${35 / events.length}%`
                                                }}>{event.label}</div>;
                                            })
                                        }
                                        <div className="ItemsTable__header-cell ItemsTable__header-cell--edit">
                                            Edit
                                        </div>
                                    </div>
                                    <div className="ItemsTable__content">
                                        {
                                            displayedEventRSVPItems.map((item, index: number) => {
                                                return <div className="ItemsTable__row" key={index}>
                                                    <div className="ItemsTable__cell ItemsTable__cell--name">
                                                        {item.name}
                                                    </div>
                                                    <div className="ItemsTable__cell ItemsTable__cell--email">
                                                        {item.email}
                                                    </div>
                                                    <div
                                                        className="ItemsTable__cell ItemsTable__cell--shareholder ItemsTable__cell--center">
                                                        {
                                                            item.is_shareholder && <FontAwesomeIcon icon={faCheck}/>
                                                        }
                                                    </div>
                                                    {
                                                        events.map((event: IEvent, index: number) => {
                                                            return <div
                                                                className="ItemsTable__cell ItemsTable__cell--center"
                                                                style={{
                                                                    width: `${35 / events.length}%`
                                                                }} key={index}>
                                                                {
                                                                    (() => {
                                                                        const attending = item.events_attending.find((eventId:string) => {
                                                                            return eventId === event.id;
                                                                        });

                                                                        return attending &&
                                                                            <FontAwesomeIcon icon={faCheck}/>;
                                                                    })()
                                                                }
                                                            </div>;
                                                        })
                                                    }
                                                    <div className="ItemsTable__cell ItemsTable__cell--edit">
                                                        <Dropdown
                                                            renderTrigger={({onClick}) => (
                                                                <Button
                                                                    buttonType="muted"
                                                                    style={{
                                                                        lineHeight: '16px'
                                                                    }}
                                                                    onClick={onClick}
                                                                >
                                                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                                                </Button>
                                                            )}
                                                        >
                                                            <DropdownMenu alignment="right">
                                                                <DropdownOption onClick={() => {
                                                                    edit(item.id);
                                                                }}>Edit</DropdownOption>
                                                                <DropdownSeparator/>
                                                                <DropdownOption red onClick={() => {
                                                                    remove(item.id);
                                                                }}>
                                                                    Delete
                                                                </DropdownOption>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </div>;
                                            })
                                        }
                                    </div>
                                </div>
                            </> : <div>
                                <Alert>
                                    No items…
                                </Alert>
                            </div>
                        }
                        {
                            errorMessage && <Alert variant="error">
                                {errorMessage}
                            </Alert>
                        }
                        <div style={{marginTop: 'var(--spacing-l)'}}>
                            <ButtonGroup>
                                <Button buttonType="muted" buttonSize="s" disabled={currentPage === 1} style={{marginRight: 'var(--spacing-s)'}} onClick={() => {
                                    const previousPage:number = currentPage - 1;
                                    loadRsvpEvents(previousPage, () => {
                                        setCurrentPage(previousPage);
                                        if(itemsTableRef.current) {
                                            // @ts-ignore
                                            itemsTableRef.current.scrollIntoView();
                                        }
                                    });
                                }}>
                                    Previous
                                </Button>
                                <Button buttonType="muted" buttonSize="s" disabled={((currentPage + 1) * itemsPerPage) > totalItems} onClick={() => {
                                    const nextPage:number = currentPage + 1;
                                    loadRsvpEvents(nextPage, () => {
                                        setCurrentPage(nextPage);
                                        if(itemsTableRef.current) {
                                            // @ts-ignore
                                            itemsTableRef.current.scrollIntoView();
                                        }
                                    });
                                }}>
                                    Next
                                </Button>
                            </ButtonGroup>
                            <div style={{marginTop: 'var(--spacing-s)'}}>
                                Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
                            </div>
                        </div>
                        <div style={{marginTop: 'var(--spacing-l)'}}>
                            <ButtonGroup>
                                <Button buttonType="muted" buttonSize="s" style={{marginRight: 'var(--spacing-s)'}} onClick={() => {
                                    create();
                                }}>
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New RSVP
                                </Button>
                                {
                                    allEventRSVPItems.length > 0 && <Button buttonType="primary" buttonSize="s" onClick={download}>
                                        Download CSV
                                    </Button>
                                }
                            </ButtonGroup>
                        </div>

                    </> : <div>
                        <Alert>
                            Loading RSVP…
                        </Alert>
                    </div>
                }
            </FieldGroup>
        </Canvas>
    );
};

export default EventsRSVPConfigScreen;