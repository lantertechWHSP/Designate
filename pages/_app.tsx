import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/lib/theme/theme';
import Head from 'next/head';

const typefaces = localFont({
    src: [
        {
            path: '/fonts/Gramatika-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '/fonts/Gramatika-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '/fonts/Gramatika-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '/fonts/Gramatika-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '/fonts/Gramatika-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        // Italic
        {
            path: '/fonts/Gramatika-LightItalic.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: '/fonts/Gramatika-RegularItalic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '/fonts/Gramatika-MediumItalic.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: '/fonts/Gramatika-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: '/fonts/Gramatika-BlackItalic.woff2',
            weight: '900',
            style: 'italic',
        },
    ],
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) : ReactNode {
    return <ChakraProvider theme={theme}>
        <Head>
            <title>WHSP</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="version" content="0.7.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" as="font" />
        </Head>
        <Box className={typefaces.className} >
            <Component {...pageProps} />
        </Box>
    </ChakraProvider>;
}
