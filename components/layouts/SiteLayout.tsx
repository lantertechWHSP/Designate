import type { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/lib/theme/theme';
import Head from 'next/head';
import Script from 'next/script';
import Router from 'next/router';
import ReactGA from 'react-ga4';

export const GA_TRACKING_ID:string = process.env.NEXT_PUBLIC_GA_ID;

declare global {
    interface Window {
        dataLayer: any;
        gtag: any;
    }
}

if(GA_TRACKING_ID) {
    ReactGA.initialize([
        {
            trackingId: GA_TRACKING_ID,
        },
    ]);

    Router.events.on('routeChangeComplete', (url) => {
        ReactGA.send({ hitType: "pageview", page: url });
    });
}

const SiteLayout = ({ children }:any) : ReactNode => {
    return <ChakraProvider theme={theme}>
        <Head>
            <title>Soul Patts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="version" content="1.0.1" />
            <meta name="google-site-verification" content="I3VZKcFh4ZN-aMYLATi9Uc-atpsN8_PgdcrB_1-VSTA" />
        </Head>
        {
            GA_TRACKING_ID && <>
                <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
                <Script
                    id="google-analytics"
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                    });
              `,
                    }}
                />
            </>
        }
        {children}
    </ChakraProvider>;
};

export default SiteLayout;
