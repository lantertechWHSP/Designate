import type { NextPage } from 'next';
import { doQuery, queries } from '~/dato/api';
import { getBlocks, getLayoutData } from '~/lib/utils';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { IBlock } from '~/interfaces/util/block';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';
import { DATO_QUERY_VALUES } from '~/components/elements/posts/PostList';
import PostListPageLayout from '~/components/pages/layouts/PostListPageLayout';
import { ModularContent } from '~/components/ModularContent';
import React from 'react';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    featuredPosts?:IPost[];
    posts?:IPost[];
    postsMeta?:any;
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'news';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const posts:IPost[] = await doQuery(queries.posts, {
        first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
        orderBy: DATO_QUERY_VALUES.ORDER_BY,
    }).then(({ posts }) => posts || []);

    const postsMeta:IPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});
    const blocks:IBlock[] = await getBlocks(page?.blocks);

    const layout:ILayout = getLayoutData(site, page, preview);

    return {
        props: {
            layout,
            posts,
            postsMeta,
            blocks
        },
        revalidate: 10
    };
}

const NewsPage : NextPage = ({layout, posts, postsMeta, blocks }:INextPageProps) : JSX.Element => {
    return (
        <PostListPageLayout layout={layout} posts={posts} postsMeta={postsMeta}>
            <ModularContent content={blocks} />
        </PostListPageLayout>
    );
};

export default NewsPage;
