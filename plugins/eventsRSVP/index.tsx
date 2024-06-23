import React, { ReactNode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { connect, IntentCtx, RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import EventsRSVPConfigScreen from "~/plugins/eventsRSVP/configScreen";

const EventsRSVPPlugin:any = () : ReactNode => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    // const [ctx.formValues]
    let isRendered = false;

    const [rsvp, setRSVP] = useState([]);

    const isInIframe:any = () : boolean => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    };

    const render:any = (component: React.ReactNode) => {
        if(!isRendered) {
            createRoot(document.getElementById('__next')).render(<React.StrictMode>{component}</React.StrictMode>);
            isRendered = true;
        }
    };

    useEffect(() => {
        if(!isLoaded) {
            if(isInIframe()) {
                connect({
                    manualFieldExtensions(_ctx: IntentCtx) {
                        return [
                            {
                                id: 'rsvp',
                                name: 'RSVP',
                                type: 'editor',
                                fieldTypes: ['links'],
                            },
                        ];
                    },
                    renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
                        switch (fieldExtensionId) {
                            case 'rsvp': return render(<EventsRSVPConfigScreen ctx={ctx} />);
                        }
                    }
                });
            }

            setIsLoaded(true);
        }
    }, [isLoaded]);

    return (
        <>Carl</>
    );
};

export default EventsRSVPPlugin;