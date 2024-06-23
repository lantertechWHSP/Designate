import React, { ReactNode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { connect, IntentCtx, RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import EventsRSVPConfigScreen from "~/plugins/eventsRSVP/rsvp/configScreen";

const EventsRSVPPlugin:any = () : ReactNode => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    let isRendered = false;

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
                                id: 'event_rsvp_list',
                                name: 'Event RSVP List',
                                type: 'editor',
                                fieldTypes: ['links'],
                            },
                            {
                                id: 'event_rsvp_attending',
                                name: 'Event RSVP Attending',
                                type: 'editor',
                                fieldTypes: ['links']
                            }
                        ];
                    },
                    renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
                        switch (fieldExtensionId) {
                            case 'event_rsvp_list': return render(<EventsRSVPConfigScreen ctx={ctx} />);
                            case 'event_rsvp_attending': return <></>;
                        }
                    }
                });
            }

            setIsLoaded(true);
        }
    }, [isLoaded]);

    return (
        <></>
    );
};

export default EventsRSVPPlugin;