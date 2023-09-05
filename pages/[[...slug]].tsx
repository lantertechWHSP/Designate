import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { ISite, ILayout, IPage } from '~/interfaces';

export async function getStaticPaths() : Promise<any> {
    const systemPages:string[] = [
        'news',
        'about/board',
        'about/management',
        'investors/key-dates'
    ];

    const pages:IPage = await doQuery(queries.pages).then(({ pages }) => pages);
    const paths:any = Array.isArray(pages) && pages.length > 0 ? pages
        .filter((page) => !systemPages.includes(page.slug))
        .map((page) => {
            const slug = page.slug === 'home' ? [''] : page.slug.split('/');
            return { params: { slug } };
        }) : [];

    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }) : Promise<any> {
    const { slug: slugRaw } = params;

    const slug:string = slugRaw ? slugRaw.join('/') : 'home';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);

    return { props: { layout, blocks } };
}

const Page : NextPage = ({layout, blocks}:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
        </Layout>
    );
};

export default Page;
