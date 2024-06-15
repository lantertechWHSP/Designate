import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, Form, TextField } from 'datocms-react-ui';
import { useCallback, useState } from 'react';

type PropTypes = {
    ctx: RenderManualFieldExtensionConfigScreenCtx;
};

// this is how we want to save our settings
type Parameters = {
    rsvp: any;
};

const RSVPConfigScreen = ({ ctx }: PropTypes) : any => {
    const [formValues, setFormValues] = useState<Partial<Parameters>>(
        ctx.parameters,
    );

    // const update = useCallback((field, value) => {
    //     const newParameters = { ...formValues, [field]: value };
    //     setFormValues(newParameters);
    //     ctx.setParameters(newParameters);
    // }, [formValues, setFormValues, ctx.setParameters]);

    return (
        <Canvas ctx={ctx}>
            <Form>
                <div>Carl</div>
                {/*<TextField*/}
                {/*    id="rsvp"*/}
                {/*    name="rsvp"*/}
                {/*    label="RSVP"*/}
                {/*    required*/}
                {/*    value={formValues.rsvp}*/}
                {/*    onChange={update.bind(null, 'maxRating')}*/}
                {/*/>*/}
            </Form>
        </Canvas>
    );
};

export default RSVPConfigScreen;