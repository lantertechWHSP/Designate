import { Canvas, FieldGroup, Button, Dropdown, DropdownMenu, DropdownOption, DropdownSeparator } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import 'datocms-react-ui/styles.css';
import { doQuery, queries } from "~/dato/api";
import './configScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { buildClient } from '@datocms/cma-client-browser';

const client = buildClient({
    apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
    environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
});

type PropTypes = {
    ctx: any;
};

const EventsRSVPConfigScreen = ({ ctx }: PropTypes) : any => {
    const [eventDates, setEventDates] = useState([]);
    // Presentation object for the RSVP’s
    const [eventRSVPItems, setEventRSVPItems] = useState([]);
    // RSVP id’s
    const [rsvps, setRSVPs] = useState(ctx.formValues.rsvp);

    useEffect(() => {
        if(ctx.formValues.event_dates) {
            doQuery(queries.eventDates, {
                in: ctx.formValues.event_dates
            }).then((response) => {
                setEventDates(response.eventDates);
            });
        }

        if(ctx.formValues.rsvp) {
            (async () => {
                const values = [];
                let hasAllValues = false;
                let batchIndex = 0;

                while(!hasAllValues) {
                    const batchValues = await doQuery(queries.eventRSVP, { first: 100, skip: 100 * batchIndex, in: ctx.formValues.rsvp }).then(({ eventRSVPS }) => eventRSVPS);

                    values.push(...batchValues);

                    if(batchValues.length < 1) {
                        hasAllValues = true;
                    }
                    else {
                        batchIndex++;
                    }
                }

                setEventRSVPItems(values);
            })();
        }
    }, []);

    const download:any = () : void => {
        if(eventRSVPItems.length > 0) {
            let CSVString:string = '';
            const title:string = ctx.formValues.title ? `${ctx.formValues.title} — RSVP` : 'RSVP';

            const eventDateLabels = eventDates.map((eventDate:any) => {
                return `Attending ${eventDate.label}`;
            });

            CSVString += ['Name', 'Email', 'Shareholder', ...eventDateLabels].join(',');
            CSVString += "\r\n";

            eventRSVPItems.map((item) => {
                const eventAttending = eventDates.map((eventDate:any) => {
                    const attending = item.eventDatesAttending.find((eventDatesAttending) => {
                        return eventDatesAttending.id === eventDate.id;
                    });

                    return attending ? 'Yes' : 'No';
                });

                CSVString += [item.name, item.email, item.isShareholder ? 'Yes' : 'No', ...eventAttending].join(',');
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
        const item = await ctx.createNewItem(process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID);

        if (item) {
            const rsvpItem:any = {
                id: item.id,
                name: item.attributes.name,
                email: item.attributes.email,
                isShareholder: item.attributes.is_shareholder,
                eventDatesAttending: item.attributes.event_dates_attending.map((id) => {
                    return {
                        id: id
                    };
                })
            };

            // Add the RSVP item
            const newEventRSVPItems = [...eventRSVPItems, rsvpItem];
            setEventRSVPItems(newEventRSVPItems);
            const newRSVPs = [...rsvps, item.id];
            setRSVPs(newRSVPs);

            // Add the RSVP id to the form value
            await ctx.setFieldValue('rsvp', newRSVPs);

            // Save the record
            await ctx.saveCurrentItem();
        }
    };

    const edit:any = async (id:string): Promise<void> => {
        const item = await ctx.editItem(id);
        if(item) {
            const rsvpItem:any = {
                id: item.id,
                name: item.attributes.name,
                email: item.attributes.email,
                isShareholder: item.attributes.is_shareholder,
                eventDatesAttending: item.attributes.event_dates_attending.map((id) => {
                    return {
                        id: id
                    };
                })
            };

            const newEventRSVPItems = [...eventRSVPItems];
            for(let i = 0; i < newEventRSVPItems.length; i++) {
                if(newEventRSVPItems[i].id === rsvpItem.id) {
                    newEventRSVPItems[i] = {
                        ...rsvpItem
                    };
                }
            }

            setEventRSVPItems(newEventRSVPItems);
        }
    };

    const remove:any = async (id:string): Promise<void> => {
        // Remove the RSVP item
        const newEventRSVPItems = eventRSVPItems.filter((eventRSVPItem) => {
            return eventRSVPItem.id !== id;
        });
        setEventRSVPItems(newEventRSVPItems);
        const newRSVPs = newEventRSVPItems.map((eventRSVPItem) => {
            return eventRSVPItem.id;
        });
        setRSVPs(newRSVPs);

        // Add the RSVP id to the form value
        await ctx.setFieldValue('rsvp', newRSVPs);

        // Save the record
        await ctx.saveCurrentItem();

        await client.items.destroy(id);
    };

    return (
        <Canvas ctx={ctx}>
            <FieldGroup>
                {
                    eventRSVPItems.length > 0 ? <>
                        <div className="ItemsTable">
                            <div className="ItemsTable__header-row">
                                <div className="ItemsTable__header-cell">Name</div>
                                <div className="ItemsTable__header-cell ItemsTable__header-cell--wide">Email</div>
                                <div className="ItemsTable__header-cell">Shareholder</div>
                                {
                                    eventDates.map((eventDate:any, index:number) => {
                                        return <div key={index} className="ItemsTable__header-cell">{eventDate.label}</div>;
                                    })
                                }
                                <div className="ItemsTable__header-cell">
                                    Edit
                                </div>
                            </div>
                            <div className="ItemsTable__content">
                                {
                                    eventRSVPItems.map((item, index: number) => {
                                        return <div className="ItemsTable__row" key={index}>
                                            <div className="ItemsTable__cell">
                                                {item.name}
                                            </div>
                                            <div className="ItemsTable__cell ItemsTable__cell--wide">
                                                {item.email}
                                            </div>
                                            <div className="ItemsTable__cell">
                                                {
                                                    item.isShareholder && <FontAwesomeIcon icon={faCheck} />
                                                }
                                            </div>
                                            {
                                                eventDates.map((eventDate:any, index:number) => {
                                                    return <div className="ItemsTable__cell" key={index}>
                                                        {
                                                            (() => {
                                                                const attending = item.eventDatesAttending.find((eventDatesAttending) => {
                                                                    return eventDatesAttending.id === eventDate.id;
                                                                });

                                                                return attending && <FontAwesomeIcon icon={faCheck} />;
                                                            })()
                                                        }
                                                    </div>;
                                                })
                                            }
                                            <div>
                                                <Dropdown
                                                    renderTrigger={({ onClick }) => (
                                                        <Button
                                                            buttonType="muted"
                                                            style={{
                                                                lineHeight: '16px'
                                                            }}
                                                            onClick={onClick}
                                                        >
                                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                                        </Button>
                                                    )}
                                                >
                                                    <DropdownMenu alignment="right">
                                                        <DropdownOption onClick={() => {
                                                            edit(item.id);
                                                        }}>Edit</DropdownOption>
                                                        <DropdownSeparator />
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
                        <div style={{ marginTop: 'var(--spacing-l)' }}>
                            <Button buttonType="muted" buttonSize="s" onClick={() => {
                                create();
                            }}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New RSVP
                            </Button>
                        </div>
                        <div style={{ marginTop: 'var(--spacing-l)' }}>
                            <Button buttonType="primary" buttonSize="s" onClick={download}>
                                Download CSV
                            </Button>
                        </div>
                    </> : <div>
                        No items…
                        <div style={{marginTop: 'var(--spacing-l)'}}>
                            <Button buttonType="muted" buttonSize="s" onClick={() => {
                                create();
                            }}>
                                <FontAwesomeIcon icon={faPlus} /> New RSVP
                            </Button>
                        </div>
                    </div>
                }
            </FieldGroup>
        </Canvas>
    );
};

export default EventsRSVPConfigScreen;