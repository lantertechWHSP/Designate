import React from 'react';
import type { NextPage } from 'next';
import DefaultPageLayout from '~/components/pages/layouts/DefaultPageLayout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { IBlock } from '~/interfaces/util/block';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'investor-centre/key-dates';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);

    return {
        props: {
            layout,
            blocks,
        },
        revalidate: 10
    };
}

const KeyDatesPage : NextPage = ({ layout, blocks }:INextPageProps)  : JSX.Element => {
    return (
        <DefaultPageLayout layout={layout}>
            <ModularContent content={blocks} />
        </DefaultPageLayout>
    );
};

export default KeyDatesPage;
