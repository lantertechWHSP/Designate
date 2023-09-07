import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { Profiles } from '~/components/elements/profiles/profiles';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { IBlock } from '~/interfaces/util/block';
import { IPerson } from '~/interfaces/models/person';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock;
    people?:IPerson[];
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'people-and-governance/board-of-directors';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);
    const people:any = await doQuery(queries.people, { definition : 'Board' }, preview).then(
        ({ people }) => people || []
    );

    return { props: { layout, blocks, people } };
}

const BoardPage : NextPage = ({ layout, blocks, people }:INextPageProps)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <Profiles people={people} />
        </Layout>
    );
};

export default BoardPage;
