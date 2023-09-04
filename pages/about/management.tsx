import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { Profiles } from '~/components/elements/profiles/profiles';

export async function getStaticProps({ preview }) : Promise<any> {
    const slug = 'about/management';
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page);
    const people = await doQuery(queries.people, { definition : 'Management' }, preview).then(
        ({ people }) => people || []
    );

    return { props: { layout, blocks: blocks ? blocks : [], people } };
}

const ManagementPage : NextPage = ({layout, blocks, people}:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <Profiles people={people} />
        </Layout>
    );
};

export default ManagementPage;
