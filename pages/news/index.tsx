import type { NextPage } from 'next';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData } from '~/lib/utils';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { IBlock } from '~/interfaces/util/block';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';
import { DATO_QUERY_VALUES } from '~/components/elements/posts/PostList';
import PostListLayout from '~/components/layouts/PostListLayout';

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

    const featuredPosts:IPost[] = await doQuery(queries.featuredPosts, {
        orderBy: 'publishDate_DESC'
    }).then(({ featuredPostsList }) => featuredPostsList.posts || []);

    const posts:IPost[] = await doQuery(queries.posts, {
        first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
        orderBy: 'publishDate_DESC',
    }).then(({ posts }) => posts || []);
    const postsMeta:IPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});

    const layout:ILayout = getLayoutData(site, page, preview);

    return { props: { layout, featuredPosts, posts, postsMeta } };
}

const NewsPage : NextPage = ({layout, featuredPosts, posts, postsMeta}:INextPageProps) : JSX.Element => {
    // console.log(posts);

    return (
        <PostListLayout layout={layout} featuredPosts={featuredPosts} posts={posts} postsMeta={postsMeta} />
    );
};

export default NewsPage;
