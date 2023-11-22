import React, {ReactNode, useState} from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { DateTime } from 'luxon';
import { Image } from '~/components/elements/image';
import SocialShare from '~/components/elements/socialShare';
import Preview from '~/components/site/Preview';
import VectorEffect from '~/components/elements/shapes/VectorEffect';
import { zIndex } from '~/lib/theme/theme';
import {AnimateOverflow} from "~/components/elements/animation/AnimateOverflow";
import {AnimateOpacity} from "~/components/elements/animation/AnimateOpacity";

const PostLayout:any = ({ layout, post, children }:any) : ReactNode => {
    const [annotation] = useState((() => {
        const date:string|null = layout?.page?.publishDate ? DateTime.fromISO(layout?.page?.publishDate).toFormat('MMM d, yyyy') : null;

        if (post?.author?.name && date) {
            return <>{post?.author?.name}, {date}</>;
        }
        else if (post?.author?.name) {
            return post?.author?.name;
        }
        else if(date) {
            return date;
        }
    })());

    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            {
                layout?.preview && <Preview />
            }
            <Header menu={layout?.menu} />
            {
                post?.image && post?.image?.responsiveImage ? <><Flex width="100%"
                    height={['550px']}
                    background="linear-gradient(270deg, #50513C 0%, rgba(228, 221, 193, 0.50) 100%)"
                    overflowX="hidden"
                    align="flex-end">
                    <Box width="100%" marginBottom="200px">
                        <Container>
                            <Row justify="center">
                                <Column width={[ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                    {
                                        <Box color="charcoalBlur" mb={4}>
                                            <AnimateOverflow>
                                                {annotation}
                                            </AnimateOverflow>
                                        </Box>
                                    }
                                    {
                                        post?.title && <Heading as="h1"
                                            fontSize={['50px']}
                                            lineHeight={['54px']}
                                            fontWeight={500}
                                            maxHeight={['104px']}>
                                            <AnimateOverflow>
                                                <Box overflow="hidden"
                                                     textOverflow="ellipsis">
                                                    {post.title}
                                                </Box>
                                            </AnimateOverflow>
                                        </Heading>
                                    }
                                </Column>
                            </Row>
                        </Container>
                    </Box>
                </Flex><Box position="relative" marginTop="-160px">
                    <Container>
                        <Row justify="center">
                            <Column width={[ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                <AnimateOpacity>
                                    <Image image={post?.image} borderRadius="3px" overflow="hidden" />
                                </AnimateOpacity>
                                {
                                    (post?.image?.title) && <Text variant="caption"  mt={2} mb={0}>
                                        {post?.image?.title}
                                    </Text>
                                }
                            </Column>
                        </Row>
                    </Container>
                </Box></> : <Box h={['376px']}
                    width="100%"
                    position="relative"
                    overflowX="hidden"
                    background="linear-gradient(270deg, #50513C 0%, rgba(228, 221, 193, 0.50) 100%)">
                    <Container>
                        <Row>
                            <Column width={[ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                <Flex h={['376px']} align="flex-end" zIndex={zIndex.heroHeading} position="relative">
                                    <Box mb={['40px', ,'50px', '60px']}>
                                        {
                                            post?.title && <Heading as="h1"
                                                fontSize={['50px']}
                                                lineHeight={['54px']}
                                                fontWeight={500}
                                                color="charcoal">
                                                <AnimateOverflow>
                                                    <Box overflow="hidden"
                                                         textOverflow="ellipsis">
                                                        {post?.title}
                                                    </Box>
                                                </AnimateOverflow>
                                            </Heading>
                                        }
                                        {
                                            <Box color="charcoalBlur" mb={0}>
                                                <AnimateOverflow>
                                                    {annotation}
                                                </AnimateOverflow>
                                            </Box>
                                        }
                                    </Box>

                                </Flex>
                            </Column>
                        </Row>
                    </Container>
                    <Box position="absolute" top="0" left={['0', '30%', '40%', ,'60%']}  height="100%">
                        <VectorEffect />
                    </Box>
                </Box>
            }
            {
                children && <Box>
                    {children}
                </Box>
            }
            <Box mt={['40px', ,'50px', '60px']} mb={['120px']}>
                <Container>
                    <Row justify="center">
                        <Column width={[ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                            <SocialShare />
                        </Column>
                    </Row>
                </Container>
            </Box>
            <Footer {...layout?.footer} ratio={[3, 2]} />
        </Flex>
    );
};

export default PostLayout;
