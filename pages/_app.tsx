import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/lib/theme/theme';
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
            <title>WHSP</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="version" content="0.7.2" />
        </Head>
        <Box>
            <Component {...pageProps} />
        </Box>
    </ChakraProvider>;
}
