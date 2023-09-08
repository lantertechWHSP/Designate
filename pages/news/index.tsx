import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { IBlock } from '~/interfaces/util/block';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';
import PostList, { DATO_QUERY_VALUES } from "~/components/elements/posts/PostList";

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    posts?:IPost[];
    postsMeta?:any;
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'news';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const posts:IPost[] = await doQuery(queries.posts, { first: DATO_QUERY_VALUES.ITEMS_PER_PAGE }).then(({ posts }) => posts || []);
    const postsMeta:IPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:IBlock[] = await getBlocks(page?.blocks);

    return { props: { layout, blocks, posts, postsMeta } };
}

const NewsPage : NextPage = ({layout, blocks, posts, postsMeta}:INextPageProps) : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <PostList latestPosts={posts} postsMeta={postsMeta} />
        </Layout>
    );
};

export default NewsPage;
