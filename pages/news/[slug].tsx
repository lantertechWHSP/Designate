import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';

export async function getStaticPaths() : Promise<any> {
    const posts = await doQuery(queries.posts).then(({ posts }) => posts);
    const paths = posts.map((post) => ({
        params: { slug: post.slug }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }) : Promise<any> {
    const { slug } = params;
    const post = await doQuery(queries.post, { slug }, preview).then(
        ({ post }) => post
    );

    const site = await doQuery(queries.site);
    const layout = getLayoutData(site, post, preview);
    const blocks = await getBlocks(post);

    return { props: { post, layout, blocks } };
}

const PostPage : NextPage = ({layout, blocks}:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
        </Layout>
    );
};

export default PostPage;
