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
import PostList, { DATO_QUERY_VALUES } from '~/components/elements/posts/PostList';
import PlainLayout from '~/components/layouts/PlainLayout';
import FeaturedPostsCarousel from '~/components/elements/posts/FeaturedPostsCarousel';

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

    const featuredPosts:IPost[] = await doQuery(queries.posts, {
        first: 3,
        filter: {
            isFeatured: {
                'eq': true
            }
        },
        orderBy: 'publishDate_DESC'
    }).then(({ posts }) => posts || []);

    const posts:IPost[] = await doQuery(queries.posts, { first: DATO_QUERY_VALUES.ITEMS_PER_PAGE }).then(({ posts }) => posts || []);
    const postsMeta:IPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});

    const layout:ILayout = getLayoutData(site, page, preview);

    return { props: { layout, featuredPosts, posts, postsMeta } };
}

const NewsPage : NextPage = ({layout, featuredPosts, posts, postsMeta}:INextPageProps) : JSX.Element => {
    return (
        <PlainLayout layout={layout}>
            <FeaturedPostsCarousel posts={featuredPosts} />
            <PostList latestPosts={posts} postsMeta={postsMeta} />
        </PlainLayout>
    );
};

export default NewsPage;
