import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const HomePage : NextPage = () : JSX.Element => {
    return <>
        <Head>
            <title>
                Home Page
            </title>
        </Head>
        <h1>Test</h1>
        <p>Test</p>
    </>;
};

export default HomePage;
