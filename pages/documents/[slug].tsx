import React, { useEffect } from 'react';
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
    const documents:any = await doQuery(queries.documents, { first: 100 }).then(({ posts }) => posts);
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

    return {
        props: {
            document
        },
        revalidate: 10
    };
}

const DocumentPage : NextPage = ({ document }:any)  : JSX.Element => {
    useEffect(() => {
        if(document?.document?.url) {
            window.location.href = document.document.url;
        }
        else {
            window.location.href = '/error';
        }
    }, []);

    return <></>;
};

export default DocumentPage;
