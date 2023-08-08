import React from 'react';
import Head from 'next/head';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { theme } from '~/lib/theme/theme';
import Fonts from "~/lib/theme/fonts";

const RootLayout = ({ children }) : React.ReactNode => {
    return (
        <html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="format-detection" content="date=no" />
                <meta name="format-detection" content="address=no" />
                <meta name="format-detection" content="email=no" />
                <meta name="version" content="0.2.0" />
            </Head>
            <body>
                <ChakraBaseProvider theme={theme}>
                    <Fonts>
                        {children}
                    </Fonts>
                </ChakraBaseProvider>
            </body>
        </html>
    );
};

export default RootLayout;
