import { Canvas, Form, FieldGroup, TextField, SelectField } from 'datocms-react-ui';
import { useEffect, useCallback, useState } from 'react';
import 'datocms-react-ui/styles.css';
import {doQuery, queries} from "~/dato/api";
// import { buildClient } from "@datocms/cma-client-node";

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

    useEffect(() => {
        if(ctx.formValues.rsvp) {
            doQuery(queries.eventRSVP, {
                in: ctx.formValues.rsvp
            }).then((response) => {
                console.log(response);
            });
        }
    }, [ctx.formValues]);

    return (
        <Canvas ctx={ctx}>
            <Form>
                <FieldGroup>
                    <input type="hidden" id="rsvp" name="rsvp" value={formValues.rsvp} />
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