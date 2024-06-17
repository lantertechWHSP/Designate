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
import {IDocument, IDocumentsFilters, IDocumentsMeta} from '~/interfaces/models/document';
import DocumentReportsList, { DATO_QUERY_VALUES } from '~/components/elements/documents/DocumentReportsList';
import { IFilter } from '~/interfaces/util/filter';
import { uniqBy as _uniqBy, map as _map } from 'lodash';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    documents?:IDocument[];
    doucmentsMeta?:IDocumentsMeta;
    documentsFilters?:IDocumentsFilters;
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'investor-centre/financial-reports';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);
    const documents:IDocument[] = await doQuery(queries.documents, {
        first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
        orderBy: DATO_QUERY_VALUES.ORDER_BY,
        filter: {
            category: {
                eq: DATO_QUERY_VALUES.REPORTS_CATEGORY_ID
            }
        }
    }, preview).then(
        ({ documents }) => documents || []
    );

    const doucmentsMeta:IDocumentsMeta = await doQuery(queries.documentsMeta, {
        filter: {
            category: {
                eq: DATO_QUERY_VALUES.REPORTS_CATEGORY_ID
            }
        }
    }).then(({ documentsMeta }) => {
        return {
            count: documentsMeta?.count ? documentsMeta.count  : 0,
        };
    });

    const documentsFilters:IDocumentsFilters = await doQuery(queries.documentsFilters, {
        filter: {
            category: {
                eq: DATO_QUERY_VALUES.REPORTS_CATEGORY_ID
            }
        }
    }).then(({ firstDate, lastDate, tags }) => {
        const yearFilters:IFilter[] = [{
            value: 'none',
            label: 'All Years'
        }];

        if(firstDate && firstDate[0] && lastDate && lastDate[0]) {
            // Date Filters

            const startYear:number = +(firstDate[0].date?.split('-')[0]);
            const endYear:number = +(lastDate[0].date?.split('-')[0]);

            for(let date:number = endYear; date >= startYear; date--) {
                yearFilters.push({
                    value: date.toString(),
                    label: date.toString()
                });
            }
        }

        // Tag Filters
        let tagFilters:any[] = [{
            id: 'none',
            label: 'All Document Types'
        }];

        if(tags) {
            tags.map((tag:any) => {
                tagFilters.push(...tag.tags);
            });

            tagFilters = _uniqBy(tagFilters, (tag:any) => {
                return tag.id;
            });

            tagFilters = _map(tagFilters, (tag:any) => {
                return {
                    value: tag?.id,
                    label: tag?.label
                };
            });
        }

        return {
            yearFilters: yearFilters,
            tagFilters: tagFilters
        };
    });

    return {
        props: {
            layout,
            blocks,
            documents,
            doucmentsMeta,
            documentsFilters
        },
        revalidate: 10
    };
}

const ReportsPage : NextPage = ({ layout, blocks, documents, doucmentsMeta, documentsFilters }:INextPageProps) : JSX.Element => {
    return (
        <DefaultPageLayout layout={layout}>
            <ModularContent content={blocks} />
            <DocumentReportsList latestDocuments={documents} documentsMeta={doucmentsMeta} documentsFilters={documentsFilters}  />
        </DefaultPageLayout>
    );
};

export default ReportsPage;
