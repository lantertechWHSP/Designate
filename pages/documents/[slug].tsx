import React from 'react';
import type { NextPage } from 'next';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { doQuery, queries } from '~/dato/api';
import { IDocument } from '~/interfaces/models/document';

interface INextPageProps {
}

export async function getServerSideProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
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
