import React, { useEffect } from 'react';
import { GetStaticPathsResult, NextPage } from 'next';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { doQuery, queries } from '~/dato/api';
import { IDocument } from '~/interfaces/models/document';

interface INextPageProps {
    document:IDocument;
}

export async function getStaticPaths() : Promise<GetStaticPathsResult<any>> {
    const documents:IDocument[] = [];
    let hasAllDocuments:boolean = false;
    let documentBatchIndex:number = 0;

    while(!hasAllDocuments) {
        const batchDocuments:IDocument[] = await doQuery(queries.documents, { first: 100, skip: 100 * documentBatchIndex }).then(({ documents }) => documents);

        documents.push(...batchDocuments);

        if(batchDocuments.length < 100) {
            hasAllDocuments = true;
        }
        else {
            documentBatchIndex++;
        }
    }

    const paths:any = (Array.isArray(documents) && documents.length > 0) ? documents
        .map((document) => ({
            params: { slug: document.slug || 'error' }
        })) : [];

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const { slug } = params;
    const document:IDocument = await doQuery(queries.document, { slug }, preview).then(
        ({ document }) => document
    );

    return {
        props: {
            document,
        },
    };
}

const DocumentPage : NextPage = ({ document }:any)  : JSX.Element => {
    useEffect(() => {
        if(document.document.url) {
            window.location.href = document.document.url;
        }
        else {
            window.location.href = '/error';
        }
    }, []);

    return <></>;
};

export default DocumentPage;
