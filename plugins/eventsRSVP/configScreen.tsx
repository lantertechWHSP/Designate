import { Canvas, FieldGroup, Button } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import 'datocms-react-ui/styles.css';
import { doQuery, queries } from "~/dato/api";
import { BooleanCell } from "~/plugins/eventsRSVP/booleanCell";
import './configScreen.css';

type PropTypes = {
    ctx: any;
};

const EventsRSVPConfigScreen = ({ ctx }: PropTypes) : any => {

    const [eventRSVPItems, setEventRSVPItems] = useState([]);
    const [eventDates, setEventDates] = useState([]);

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
                    const batchValues = await doQuery(queries.eventRSVP, { first: 100, skip: 100 * batchIndex }).then(({ eventRSVPS }) => eventRSVPS);

                    debugger;
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
            CSVString += ['Name', 'Email', 'Is Shareholder', ...eventDateLabels].join(',');
            CSVString += "\r\n";

            eventRSVPItems.map((event) => {
                const eventAttending = eventDates.map((eventDate:any) => {
                    const detail = event.details.find((detail) => {
                        return detail.id === eventDate.id;
                    });

                    return detail.attending ?  'Yes' : 'No';
                });

                CSVString += [event.name, event.email, event.isShareholder ? 'Yes' : 'No', ...eventAttending].join(',');
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

    return (
        <Canvas ctx={ctx}>
            <FieldGroup>
                {
                    eventRSVPItems.length > 0 ? <>
                        <div className="ItemsTable">
                            <div className="ItemsTable__header-row">
                                <div className="ItemsTable__header-cell">Name</div>
                                <div className="ItemsTable__header-cell ItemsTable__header-cell--wide">Email</div>
                                <div className="ItemsTable__header-cell">Is Shareholder</div>
                                {
                                    eventDates.map((eventDate:any, index:number) => {
                                        return <div key={index} className="ItemsTable__header-cell">Attending {eventDate.shortLabel}</div>;
                                    })
                                }
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
                                                                const detail = item.details.find((detail) => {
                                                                    return detail.id === eventDate.id;
                                                                });

                                                                return detail.attending && <BooleanCell />;
                                                            })()
                                                        }
                                                    </div>;
                                                })
                                            }
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                        <div style={{ marginTop: 'var(--spacing-l)' }}>
                            <Button buttonType="primary" onClick={download}>
                                Download CSV
                            </Button>
                        </div>
                    </> : <div>
                        No items…
                    </div>
                }
            </FieldGroup>
        </Canvas>
    );
};

export default EventsRSVPConfigScreen;