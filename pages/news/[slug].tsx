import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsResult, Params } from 'next';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IBlock } from '~/interfaces/util/block';

// @TODO add post params
interface INextPageProps {
    post?:any;
    layout?:ILayout;
    blocks?:IBlock[];
}

export async function getStaticPaths() : Promise<GetStaticPathsResult<Params>> {
    const posts:any = await doQuery(queries.posts).then(({ posts }) => posts);
    const paths:any = (Array.isArray(posts) && posts.length > 0) ? posts.map((post) => ({
        params: { slug: post.slug }
    })) : [];

    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const { slug } = params;
    const post:any = await doQuery(queries.post, { slug }, preview).then(
        ({ post }) => post
    );

    const site:ISite = await doQuery(queries.site);
    const layout:ILayout = getLayoutData(site, post, preview);
    const blocks:any = await getBlocks(post?.blocks);

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
