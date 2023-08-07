import React from 'react';
import type { NextPage } from 'next';
import Layout from "~/components/layouts/layout";

const ErrorPage : NextPage = () : JSX.Element => {
    return <Layout layout={{
        title: 'Error (404)'
    }}>
        <p>
            Page Not Found
        </p>
    </Layout>;
};

export default ErrorPage;
