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

    useEffect(() => {
        if(ctx.formValues.rsvp) {
            doQuery(queries.eventRSVP, {
                in: ctx.formValues.rsvp
            }).then((response) => {
                setEventRSVPItems(response.eventRSVPS);
            });
        }
    }, []);

    const download:any = () : void => {
        if(eventRSVPItems.length > 0) {
            let CSVString:string = '';
            const title:string = ctx.formValues.title ? `${ctx.formValues.title} — RSVP` : 'RSVP';

            CSVString += 'Name,Email,Is Shareholder, Attending\r\n';

            eventRSVPItems.map((event) => {
                CSVString += `${event.name},${event.email},${event.isShareholder ? 'Yes' : 'No'},${event.attending ? 'Yes' : 'No'}`;
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
                                <div className="ItemsTable__header-cell">Email</div>
                                <div className="ItemsTable__header-cell">Is Shareholder</div>
                                <div className="ItemsTable__header-cell">Attending</div>
                            </div>
                            <div className="ItemsTable__content">
                                {
                                    eventRSVPItems.map((item, index: number) => {
                                        return <div className="ItemsTable__row" key={index}>
                                            <div className="ItemsTable__cell">
                                                {item.name}
                                            </div>
                                            <div className="ItemsTable__cell">
                                                {item.email}
                                            </div>
                                            <div className="ItemsTable__cell">
                                                {
                                                    item.isShareholder && <BooleanCell />
                                                }
                                            </div>
                                            <div className="ItemsTable__cell">
                                                {
                                                    item.attending && <BooleanCell />
                                                }
                                            </div>
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