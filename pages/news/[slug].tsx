import React from 'react';
import type { NextPage } from 'next';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsResult } from 'next';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IBlock } from '~/interfaces/util/block';
import { IPost } from '~/interfaces/models/post';
import { ContainerWidth } from '~/components/blocks/Content';
import PostLayout from '~/components/layouts/PostLayout';

interface INextPageProps {
    post?:IPost;
    layout?:ILayout;
    blocks?:IBlock[];
}

export async function getStaticPaths() : Promise<GetStaticPathsResult<any>> {
    const posts:any = await doQuery(queries.posts).then(({ posts }) => posts);
    const paths:any = (Array.isArray(posts) && posts.length > 0) ? posts.map((post) => ({
        params: { slug: post.slug }
    })) : [];

    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const { slug } = params;
    const post:IPost = await doQuery(queries.post, { slug }, preview).then(
        ({ post }) => post
    );

    const site:ISite = await doQuery(queries.site);
    const layout:ILayout = getLayoutData(site, post, preview);
    const blocks:IBlock[] = await getBlocks(post?.blocks);

    return { props: { post, layout, blocks } };
}

const PostPage : NextPage = ({ post, layout, blocks}:any)  : JSX.Element => {

    // Format the Container Width when it’s in a post…
    blocks.map((block:IBlock) => {
        block.containerWidth = ContainerWidth.Narrow;
    });

    return (
        <PostLayout layout={layout} post={post}>
            <ModularContent content={blocks} />
        </PostLayout>
    );
};

export default PostPage;
