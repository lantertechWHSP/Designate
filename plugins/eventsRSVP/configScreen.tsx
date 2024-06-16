import { Canvas, Form, FieldGroup, TextField, SelectField, Section } from 'datocms-react-ui';
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
    const [formValues, setFormValues] = useState<Partial<Parameters>>(
        ctx.parameters,
    );

    // const update = useCallback((field, value) => {
    //     const newParameters = { ...formValues, [field]: value };
    //     setFormValues(newParameters);
    //     ctx.setParameters(newParameters);
    // }, [formValues, setFormValues, ctx.setParameters]);

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


    return (
        <Canvas ctx={ctx}>
            <FieldGroup>
                {
                    eventRSVPItems.length > 0 && <div className="ItemsTable">
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
                }
            </FieldGroup>
            <Form>
                <FieldGroup>
                    <input type="hidden" id="rsvp" name="rsvp" value={formValues.rsvp}/>
                    {/*<TextField*/}
                    {/*    id="rsvp"*/}
                    {/*    name="rsvp"*/}
                    {/*    label="RSVP"*/}
                    {/*    required*/}
                    {/*    */}
                    {/*    onChange={update.bind(null, 'rsvp')}*/}
                    {/*/>*/}
                    {/*<SelectField*/}
                    {/*    name="rsvp"*/}
                    {/*    id="rsvp"*/}
                    {/*    label="RSVP"*/}
                    {/*    value={formValues.rsvp}*/}
                    {/*    // selectInputProps={{*/}
                    {/*    //     isMulti: true,*/}
                    {/*    //     options: [*/}
                    {/*    //         { label: 'Option 1', value: 'option1' },*/}
                    {/*    //         { label: 'Option 2', value: 'option2' },*/}
                    {/*    //         { label: 'Option 3', value: 'option3' },*/}
                    {/*    //     ],*/}
                    {/*    // }}*/}
                    {/*    onChange={update.bind(null, 'rsvp')}*/}
                    {/*/>*/}

                </FieldGroup>
            </Form>
        </Canvas>
    );
};

export default EventsRSVPConfigScreen;