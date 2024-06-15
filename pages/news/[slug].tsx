import React from 'react';
import type {NextPage} from 'next';
import {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult} from 'next';
import {ModularContent} from '~/components/ModularContent';
import {doQuery, queries} from '~/dato/api';
import {getBlocks, getLayoutData} from '~/lib/utils';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IBlock } from '~/interfaces/util/block';
import { IPost } from '~/interfaces/models/post';
import { ContainerWidth } from '~/components/blocks/Content';
import PostPageLayout from '~/components/pages/layouts/PostPageLayout';

interface INextPageProps {
    post?:IPost;
    layout?:ILayout;
    blocks?:IBlock[];
}

export async function getStaticPaths() : Promise<GetStaticPathsResult<any>> {
    const posts:any = await doQuery(queries.posts, { first: 100 }).then(({ posts }) => posts);
    const paths:any = (Array.isArray(posts) && posts.length > 0) ? posts.map((post) => ({
        params: { slug: post.slug }
    })) : [];

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const { slug } = params;
    const post:IPost = await doQuery(queries.post, { slug }, preview).then(
        ({ post }) => post
    );

    const site:ISite = await doQuery(queries.site);
    const layout:ILayout = getLayoutData(site, post, preview);
    const blocks:IBlock[] = await getBlocks(post?.blocks);

    return {
        props: {
            post,
            layout,
            blocks
        },
        revalidate: 10
    };
}

const PostPage : NextPage = ({ post, layout, blocks }:any)  : JSX.Element => {
    // Format the Container Width
    if(Array.isArray(blocks) && blocks.length > 0) {
        blocks.map((block:IBlock) => {
            if(block.containerWidth === ContainerWidth.Default) {
                if(block.__typename === 'CardPanelRecord') {
                    block.containerWidth = ContainerWidth.Wide;
                }
                else {
                    block.containerWidth = ContainerWidth.Narrow;
                }
            }
        });
    }

    return (
        <PostPageLayout layout={layout} post={post}>
            <ModularContent content={blocks} />
        </PostPageLayout>
    );
};

export default PostPage;
