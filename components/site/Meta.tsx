import { ReactNode } from 'react';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';

const Meta:any = ({ tags, firstPublishedAt = null }:any) : ReactNode => {
    return (
        <Head>
            {tags && renderMetaTags(tags)}
            {firstPublishedAt && (
                <meta
                    property="article:published_time"
                    content={new Date(firstPublishedAt).toISOString()}
                />
            )}
        </Head>
    );
};

export default Meta;
