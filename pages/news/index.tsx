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
import LatestPosts from "~/components/elements/news/latestPosts";

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    latestPosts?:IPost[];
    allPostsMeta?:any;
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'news';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const latestPosts:IPost[] = await doQuery(queries.latestPosts, { first: 1 }).then(({ posts }) => posts || []);
    const allPostsMeta:IPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:IBlock[] = await getBlocks(page?.blocks);

    return { props: { layout, blocks, latestPosts, allPostsMeta } };
}

const NewsPage : NextPage = ({layout, blocks, latestPosts, allPostsMeta}:INextPageProps) : JSX.Element => {
    return (
        <Layout layout={layout}>
            <Container>
                <Heading as="h1" variant="h1">News</Heading>
            </Container>
            <ModularContent content={blocks} />
            <Container>
                <LatestPosts latestPosts={latestPosts} postsMeta={allPostsMeta} />
            </Container>
        </Layout>
    );
};

export default NewsPage;
