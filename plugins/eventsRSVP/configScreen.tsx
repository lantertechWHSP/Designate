import { Canvas, FieldGroup, Button, Dropdown, DropdownMenu, DropdownOption, DropdownSeparator } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import 'datocms-react-ui/styles.css';
import { doQuery, queries } from "~/dato/api";
import { BooleanCell } from "~/plugins/eventsRSVP/booleanCell";
import './configScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type PropTypes = {
    ctx: any;
};

const EventsRSVPConfigScreen = ({ ctx }: PropTypes) : any => {
    const [eventRSVPItems, setEventRSVPItems] = useState([]);
    const [eventDates, setEventDates] = useState([]);

    useEffect(() => {
        console.log(ctx);

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
                return `Attending ${eventDate.shortLabel}`;
            });
            // CSVString += 'Name,Email,Is Shareholder, Attending\r\n';
            CSVString += ['Name', 'Email', 'Shareholder', ...eventDateLabels].join(',');
            CSVString += "\r\n";

            // eventRSVPItems.map((event) => {
            //     const eventAttending = eventDates.map((eventDate:any) => {
            //         const detail = event.details.find((detail) => {
            //             return detail.id === eventDate.id;
            //         });
            //
            //         return detail.attending ?  'Yes' : 'No';
            //     });
            //
            //     CSVString += [event.name, event.email, event.isShareholder ? 'Yes' : 'No', ...eventAttending].join(',');
            //     CSVString += "\r\n";
            // });

            CSVString = "data:application/csv," + encodeURIComponent(CSVString);
            const anchor = document.createElement("A");
            anchor.setAttribute("href", CSVString );
            anchor.setAttribute("download", `${title}.csv`);
            document.body.appendChild(anchor);
            anchor.click();
        }
    };

    const edit:any = async (id:string): Promise<void> => {
        await ctx.editItem(id);
    };

    const create:any = async () : Promise<void> => {
        const item = await ctx.createNewItem(process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID);

        if (item) {
            debugger;

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

            // Add it to the list object on the table
            const newEventRSVPItems = [...eventRSVPItems, rsvpItem];
            setEventRSVPItems(newEventRSVPItems);

            const newRSVPIds = [...ctx.formValues.rsvp, item.id];

            // Add the RSVP id to the form value
            await ctx.setFieldValue('rsvp', newRSVPIds);

            // Edit the RSVP
            // await fetch('/api/events/editRSVP', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         id: ctx.itemId,
            //         rsvp: newRSVPIds
            //     })
            // });
        }
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
                                        return <div key={index} className="ItemsTable__header-cell">{eventDate.shortLabel}</div>;
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
                                                    item.isShareholder && <BooleanCell />
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

                                                                return attending && <BooleanCell />;
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="16px" height="16px">
                                                                <path
                                                                    d="M64 368a48 48 0 1 0 0 96 48 48 0 1 0 0-96zm0-160a48 48 0 1 0 0 96 48 48 0 1 0 0-96zM112 96A48 48 0 1 0 16 96a48 48 0 1 0 96 0z"></path>
                                                            </svg>
                                                        </Button>
                                                    )}
                                                >
                                                    <DropdownMenu alignment="right">
                                                        <DropdownOption onClick={() => {
                                                            edit(item.id);
                                                        }}>Edit</DropdownOption>
                                                        <DropdownSeparator />
                                                        <DropdownOption red onClick={() => {
                                                            // remove(item.id);
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
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New RSVP
                            </Button>
                        </div>
                    </div>
                }
            </FieldGroup>
        </Canvas>
    );
};

export default EventsRSVPConfigScreen;