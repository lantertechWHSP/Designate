import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { withSecureHeaders } from 'next-secure-headers';
import { connect, RenderFieldExtensionCtx, IntentCtx } from 'datocms-plugin-sdk';
import { Box } from '@chakra-ui/react';
import AdminLayout from "~/components/layouts/AdminLayout";

const EventsRSVP = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const isInIframe:any = () : boolean => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    };

    const render:any = (component: React.ReactNode) => {
        createRoot(document.getElementById('__next')).render(<React.StrictMode>{component}</React.StrictMode>);
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
                        console.log(fieldExtensionId);
                        switch (fieldExtensionId) {
                            case 'rsvp': return render(<Box>Carl</Box>);
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

export default withSecureHeaders({
    frameGuard: false,
    contentSecurityPolicy: {
        directives: {
            frameAncestors: 'https://soulpatts.admin.datocms.com/'
        }
    }
})(EventsRSVP);
