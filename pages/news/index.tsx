import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { Heading, Container } from '@chakra-ui/react';
import { ILayout } from '~/interfaces/layout/layout';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { IBlock } from '~/interfaces/util/block';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';
import PostList from "~/components/elements/news/PostList";

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

    const posts:IPost[] = await doQuery(queries.latestPosts, { first: 1 }).then(({ posts }) => posts || []);
    const postsMeta:IPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:IBlock[] = await getBlocks(page?.blocks);

    return { props: { layout, blocks, posts, postsMeta } };
}

const NewsPage : NextPage = ({layout, blocks, posts, postsMeta}:INextPageProps) : JSX.Element => {
    console.log(posts);

    return (
        <Layout layout={layout}>
            <Container>
                <Heading as="h1" variant="h1">News</Heading>
            </Container>
            <ModularContent content={blocks} />
            <Container>
                <PostList posts={posts} postsMeta={postsMeta} />
            </Container>
        </Layout>
    );
};

export default NewsPage;
