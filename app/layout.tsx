import React from 'react';
import Head from 'next/head';

const RootLayout = ({ children } : { children:React.ReactNode }) : React.ReactNode => {
    return (
        <html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="format-detection" content="date=no" />
                <meta name="format-detection" content="address=no" />
                <meta name="format-detection" content="email=no" />
                <meta name="version" content="0.1.0" />
            </Head>
            <body>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
