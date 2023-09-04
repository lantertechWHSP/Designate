import React, { ReactNode, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { LatestPostCard } from '~/components/elements/news/latestPostCard';
import { Heading, Button, Text, Container, SimpleGrid, Box, Spinner } from '@chakra-ui/react';

export async function getStaticProps({ preview }) : Promise<any> {
    const slug = 'news';
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const latestPosts = await doQuery(queries.latestPosts, { first: 1 }).then(({ posts }) => posts || []);
    const allPostsMeta = await doQuery(queries.postsMeta).then(({ postsMeta }) => postsMeta || {});

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page?.blocks);

    return { props: { layout, blocks, latestPosts, allPostsMeta } };
}

const LatestPosts = ({ latestPosts, postsMeta }) : ReactNode => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState(latestPosts); // Iniitial posts
    const [isLoading, setIsLoading] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [couldNotLoadPosts, setCouldNotLoadPosts] = useState(false);

    const [totalPosts] = useState(postsMeta.count || posts.length);
    const itemsPerPage = 1;

    const loadMorePosts = () : void => {
        setIsLoading(true);

        doQuery(queries.latestPosts, { isFeatured: true, first: itemsPerPage, skip: page * itemsPerPage }).then(({ posts }) => posts || []).then((newPosts) => {
            if(newPosts.length > 0) {
                setPosts([...posts, ...newPosts]);
                setPage(page + 1);
            }
            else {
                setTimeout(() => {
                    setNoMorePosts(true);
                }, 250);

                setTimeout(() => {
                    setNoMorePosts(false);
                }, 5000);
            }
        }).catch(() => {
            setCouldNotLoadPosts(true);
            setTimeout(() => {
                setCouldNotLoadPosts(false);
            }, 5000);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 250);
        });
    };

    return <>
        {
            (Array.isArray(posts) && posts.length > 0) ? <>
                <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8]}>
                    {
                        posts.map((post, index) => {
                            return <LatestPostCard {...post} key={index}/>;
                        })
                    }
                </SimpleGrid>
                {
                    (noMorePosts || posts.length === totalPosts) && <Box>
                        <Text variant="caption" color="lightGrey">No more Posts to load</Text>
                    </Box>
                }
                {
                    couldNotLoadPosts && <Box>
                        <Text variant="caption" color="lightGrey">Could not load Posts</Text>
                    </Box>
                }
                {
                    posts.length < totalPosts && <Button color="sunlight" onClick={loadMorePosts} px={0} rightIcon={isLoading && <Spinner size='sm' />}>
                        <Text textDecoration="underline">
                            Load Moar!
                        </Text>
                    </Button>
                }
            </> : <>
                <Box>
                    <Text variant="caption" color="lightGrey">No Posts</Text>
                </Box>
            </>
        }
    </>;
};

const NewsPage : NextPage = ({layout, blocks, latestPosts, allPostsMeta}:any) : JSX.Element => {
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
