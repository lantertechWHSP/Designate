import type { NextPage } from 'next';
import { doQuery, queries } from '~/dato/api';
import { getBlocks, getLayoutData } from '~/lib/utils';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { IBlock } from '~/interfaces/util/block';
import { ModularContent } from '~/components/ModularContent';
import DefaultLayout from '~/components/layouts/DefaultLayout';
import { IDocument } from '~/interfaces/models/document';
import DocumentBasicList, { DATO_QUERY_VALUES } from '~/components/elements/documents/DocumentBasicList';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    documents?:IDocument[];
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'people-and-governance/policies-and-standards';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const blocks:any = await getBlocks(page?.blocks);
    const layout:ILayout = getLayoutData(site, page, preview);

    const documents:IDocument[] = await doQuery(queries.documents, {
        filter: {
            category: {
                eq: DATO_QUERY_VALUES.POLICIES_AND_STANDARDS_CATEGORY_ID
            }
        }
    }).then(({ documents }) => documents || []);

    return { props: { layout, blocks, documents } };
}

const NewsPage : NextPage = ({ layout, blocks, documents }:INextPageProps) : JSX.Element => {
    return (
        <DefaultLayout layout={layout}>
            <ModularContent content={blocks} />
            <DocumentBasicList title="Downloads" latestDocuments={documents} />
        </DefaultLayout>
    );
};

export default NewsPage;
