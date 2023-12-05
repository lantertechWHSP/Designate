import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/lib/theme/theme';
import Head from 'next/head';
import Script from 'next/script';
import Router from 'next/router';
// import ReactGA from 'react-ga4';

export const GA_TRACKING_ID:string = process.env.NEXT_PUBLIC_GA_ID;
import * as gtag from 'lib/gtag';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

Router.events.on('routeChangeComplete', gtag.pageview);

export default function App({ Component, pageProps }: AppPropsWithLayout) : ReactNode {
    return <ChakraProvider theme={theme}>
        <Head>
            <title>Soul Patts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="version" content="0.9.0" />
        </Head>
        {GA_TRACKING_ID && (
            <>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
                    }}
                />
            </>
        )}
        <Component {...pageProps} />
    </ChakraProvider>;
}
