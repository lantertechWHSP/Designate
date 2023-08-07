import React from 'react';
import type { NextPage } from 'next';
import Layout from "~/components/layouts/Layout";
import { doQuery, queries } from "~/dato/api";
import { getLayoutData } from '~/lib/utils';

export async function getStaticProps({ _params, preview }) : Promise<any> {
    const site = await doQuery(queries.site);
    const page = {
        title: 'Error (404)',
        slug: '404'
    };
    const layout = getLayoutData(site, page, preview);

    return { props: { layout } };
}

const ErrorPage : NextPage = ({layout}:any) : JSX.Element => {
    return <Layout layout={layout}>
        <p>
            Page Not Found!
        </p>
    </Layout>;
};

export default ErrorPage;
