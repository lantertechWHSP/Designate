import React from 'react';
import type { NextPage } from 'next';
import DefaultLayout from '~/components/layouts/DefaultLayout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { ISite } from '~/interfaces/layout/site';
import { ILayout } from '~/interfaces/layout/layout';
import { IBlock } from '~/interfaces/util/block';
import { IPage } from '~/interfaces/models/page';
import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsResult } from 'next';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
}

export async function getStaticPaths() : Promise<GetStaticPathsResult<any>> {
    const systemPages:string[] = [
        'news',
        'people-and-governance/leadership-team',
        'people-and-governance/policies-and-standards',
        'investor-centre/key-dates',
        'investor-centre/financial-reports'
    ];

    const pages:IPage = await doQuery(queries.pages).then(({ pages }) => pages);
    const paths:any = Array.isArray(pages) && pages.length > 0 ? pages
        .filter((page) => !systemPages.includes(page.slug))
        .map((page) => {
            const slug:string = page.slug === 'home' ? [''] : page.slug.split('/');
            return { params: { slug } };
        }) : [];

    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const { slug: slugRaw } = params;

    const slug:string = slugRaw && Array.isArray(slugRaw) ? slugRaw.join('/') : 'home';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:IBlock[] = await getBlocks(page?.blocks);

    return { props: { layout, blocks } };
}

const Page : NextPage = ({ layout, blocks }:INextPageProps) : JSX.Element => {
    return (
        <DefaultLayout layout={layout}>
            <ModularContent content={blocks} />
        </DefaultLayout>
    );
};

export default Page;
