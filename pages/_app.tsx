import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/lib/theme/theme';
import Fonts from "~/lib/theme/fonts";
import Head from 'next/head';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) : ReactNode {
    return <ChakraProvider theme={theme}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="version" content="0.5.9" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@-10,100;-10,200;-10,300;-10,400;-10,500;-10,600;-10,700;-10,800;-10,900;0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
                rel="stylesheet" />
        </Head>
        <Fonts />
        <Component {...pageProps} />
    </ChakraProvider>;
}
