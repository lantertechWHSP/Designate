import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Flex, Box, Container, Heading } from '@chakra-ui/react';
import Preview from "~/components/site/Preview";
import FeaturedPostsCarousel from "~/components/elements/posts/FeaturedPostsCarousel";
import PostList from "~/components/elements/posts/PostList";
import VectorEffect from "~/components/elements/shapes/VectorEffect";
import {zIndex} from "~/lib/theme/theme";

const PostListPageLayout:any = ({ layout, featuredPosts, posts, postsMeta }:any) : ReactNode => {
    const hasFeaturedPosts:boolean = Array.isArray(featuredPosts) && featuredPosts.length > 0;

    return (
        <Flex minHeight="100vh" direction="column"  overflowX="hidden">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            {
                layout?.preview && <Preview />
            }
            <Header darkTheme={hasFeaturedPosts ? layout?.darkTheme : false} announcement={layout?.announcement} menu={layout?.menu} />
            <Box flex="1">
                {
                    hasFeaturedPosts ?  <FeaturedPostsCarousel posts={featuredPosts} />
                        : <Box h={['376px']} position="relative"background="linear-gradient(270deg, #50513C 0%, rgba(228, 221, 193, 0.50) 100%)">
                            <Container>
                                <Flex h={['376px']} align="flex-end" zIndex={zIndex.heroHeading} position="relative">
                                    <Heading as="h1" variant="defaultLayoutTitle" mb={['40px', ,'50px', '60px']}>
                                        News
                                    </Heading>
                                </Flex>
                            </Container>
                            <Box position="absolute" top="0" left={['0', '30%', '40%', ,'60%']}  height="100%">
                                <VectorEffect />
                            </Box>
                        </Box>
                }
                <PostList latestPosts={posts} postsMeta={postsMeta} />
            </Box>
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default PostListPageLayout;
