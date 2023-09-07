import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { IBlock } from '~/interfaces/util/block';
import { IDocument, IDocumentsMeta } from '~/interfaces/models/document';
import DocumentList, {CATEGORY_ID, ITEMS_PER_PAGE, ORDER_BY} from '~/components/elements/documents/DocumentList';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    documents?:IDocument[];
    doucmentsMeta?:IDocumentsMeta;
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'investors/reports';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);
    const documents:IDocument[] = await doQuery(queries.documents, {
        first: ITEMS_PER_PAGE,
        orderBy: ORDER_BY,
        categories: {
            eq: CATEGORY_ID
        }
    }, preview).then(
        ({ documents }) => documents || []
    );

    const doucmentsMeta:IDocumentsMeta = await doQuery(queries.documentsMeta).then(({ documentsMeta, firstDate, lastDate }) => {
        return {
            count: documentsMeta.count,
            firstDate: firstDate[0].date,
            lastDate: lastDate[0].date
        }
    });

    return { props: { layout, blocks, documents, doucmentsMeta } };
}

const ReportsPage : NextPage = ({ layout, blocks, documents, doucmentsMeta }:INextPageProps) : JSX.Element => {
    console.log(doucmentsMeta);

    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <DocumentList latestDocuments={documents} latestDocumentsMeta={doucmentsMeta}  />
        </Layout>
    );
};

export default ReportsPage;
