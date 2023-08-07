import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';

export async function getStaticPaths() : Promise<any> {
    const pages = await doQuery(queries.pages).then(({ pages }) => pages);

    const paths = pages
        .map((page) => {
            const slug = page.slug === 'home' ? [''] : page.slug.split('/');
            return { params: { slug } };
        });

    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }) : Promise<any> {
    const { slug: slugRaw } = params;

    const slug = slugRaw ? slugRaw.join('/') : 'home';
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page);

    return { props: { layout, blocks } };
}

const Page : NextPage = ({layout, blocks}) : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
        </Layout>
    );
};


export default Page;
