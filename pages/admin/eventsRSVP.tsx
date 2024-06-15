import React from 'react';
import { withSecureHeaders } from 'next-secure-headers';
import EventsRSVPPlugin from '~/plugins/eventsRSVP';

const EventsRSVP:any = () : any => {
    return <EventsRSVPPlugin />;
};

export default withSecureHeaders({
    frameGuard: false,
    contentSecurityPolicy: {
        directives: {
            frameAncestors: 'https://soulpatts.admin.datocms.com/'
        }
    }
})(EventsRSVP);
