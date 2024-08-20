import React from 'react';
import type { NextPage } from 'next';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { doQuery, queries } from '~/dato/api';
import { IPost } from '~/interfaces/models/post';
import { IDocument } from "~/interfaces/models/document";

interface INextPageProps {
    post?:IPost;
    document?:IDocument;
}

export async function getStaticPaths() : Promise<GetStaticPathsResult<any>> {
    const documents = [];

    let hasAllDocuments = false;
    let documentBatchIndex = 0;

    while(!hasAllDocuments) {
        const batchDocuments = await doQuery(queries.documents, { first: 100, skip: 100 * documentBatchIndex }).then(({ documents }) => documents);

        documents.push(...batchDocuments);

        if(batchDocuments.length < 100) {
            hasAllDocuments = true;
        }
        else {
            documentBatchIndex++;
        }
    }

    const paths:any = (Array.isArray(documents) && documents.length > 0) ? documents.map((post) => ({
        params: { slug: post.slug }
    })) : [];

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const { slug } = params;
    const document:IDocument = await doQuery(queries.document, { slug }, preview).then(
        ({ document }) => document
    );

    if(document.document.url) {
        return {
            redirect: {
                permanent: false,
                destination: document.document.url,
            },
            props:{},
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: '/error',
        },
        props:{},
    };
}

const DocumentPage : NextPage = ({ }:any)  : JSX.Element => {
    return <></>;
};

export default DocumentPage;
