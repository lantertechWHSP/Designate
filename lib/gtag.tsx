export const GA_TRACKING_ID:string = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview:any = (url:string) : void => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event:any = ({ action, category, label, value }:any) : void => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
    });
};
