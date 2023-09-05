import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { Profiles } from '~/components/elements/profiles/profiles';
import { ILayout, IPage, ISite } from '~/interfaces';

export async function getStaticProps({ preview }:any) : Promise<any> {
    const slug:string = 'about/board';
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

const BoardPage : NextPage = ({ layout, blocks, people }:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <Profiles people={people} />
        </Layout>
    );
};

export default BoardPage;
