import { Canvas, Form, FieldGroup, Button } from 'datocms-react-ui';
import { useEffect, useCallback, useState } from 'react';
import 'datocms-react-ui/styles.css';
import { doQuery, queries } from "~/dato/api";
import { BooleanCell } from "~/plugins/eventsRSVP/booleanCell";
// import { buildClient } from "@datocms/cma-client-node";
import './configScreen.css';

type PropTypes = {
    ctx: any;
};

// this is how we want to save our settings
type Parameters = {
    rsvp: any;
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
    }, [ctx.formValues]);


    const download:any = () : void => {

    };

    return (
        <Canvas ctx={ctx}>
            <FieldGroup>
                {
                    eventRSVPItems.length > 0 && <>
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
                                Download Spreadsheet
                            </Button>
                        </div>
                    </>
                }
            </FieldGroup>
            {/*<Form>*/}
            {/*    <input type="text" id="rsvp" name="rsvp" value={ctx.formValues.rsvp}/>*/}
            {/*</Form>*/}
        </Canvas>
    );
};

export default EventsRSVPConfigScreen;