import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { LatestPostCard } from '~/components/elements/cards/latestPostCard';
import { Container, SimpleGrid } from '@chakra-ui/react';

export async function getStaticProps({ preview }) : Promise<any> {
    const slug = 'news';
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const latestPosts = await doQuery(queries.latestPosts, { first: 3 }).then(({ posts }) => posts || []);

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page);

    return { props: { layout, blocks, latestPosts } };
}

const NewsPage : NextPage = ({layout, blocks, latestPosts}:any) : JSX.Element => {
    return (
        <Layout layout={layout}>
            <Container>
                <h1>News</h1>
            </Container>
            <ModularContent content={blocks} />
            <Container>
                {
                    (Array.isArray(latestPosts) && latestPosts.length > 0) && <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8]}>
                        {
                            latestPosts.map((post, index) => {
                                return <LatestPostCard {...post} key={index}/>;
                            })
                        }
                    </SimpleGrid>
                }
            </Container>
        </Layout>
    );
};

export default NewsPage;
