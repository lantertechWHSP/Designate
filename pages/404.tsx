import React from 'react';
import type { NextPage } from 'next';
import Layout from "~/components/layouts/layout";
import { doQuery, queries } from "~/dato/api";
import { getLayoutData, getBlocks } from '~/lib/utils';

export async function getStaticProps({ _params, preview }) {
    const site = await doQuery(queries.site);
    const page = {
        title: 'Error (404)',
        slug: '404'
    }
    const layout = getLayoutData(site, page, preview);
    const blocks = {};

    return { props: { layout, blocks } };
}

const ErrorPage : NextPage = ({layout}) : JSX.Element => {
    return <Layout layout={layout}>
        <p>
            Page Not Found
        </p>
    </Layout>;
};

export default ErrorPage;
