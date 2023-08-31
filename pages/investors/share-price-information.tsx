import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import SharePricePanel from '~/components/elements/yourir/SharePricePanel';

export async function getStaticProps({ _params, preview }) : Promise<any> {
    const slug = 'investors/share-price-information';
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page);

    return { props: { layout, blocks } };
}

const Page : NextPage = ({ layout, blocks }:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <SharePricePanel />
        </Layout>
    );
};

export default Page;
