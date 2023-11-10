import React, { ReactNode, useState } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Flex, Heading, Container, Box, Text } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { DateTime } from 'luxon';
import { Image } from '~/components/elements/image';
import SocialShare from '~/components/elements/socialShare';
import Preview from '~/components/site/Preview';
import VectorEffect from "~/components/elements/shapes/VectorEffect";
import {zIndex} from "~/lib/theme/theme";

const PostLayout:any = ({ layout, post, children }:any) : ReactNode => {
    const [annotation] = useState((() => {
        const date:string|null = layout?.page?.publishDate ? DateTime.fromFormat(layout?.page?.publishDate, 'yyyy-mm-dd').toFormat('DDD') : null;

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
                                <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                    {
                                        <Text color="charcoalBlur" mb={4}>
                                            {annotation}
                                        </Text>
                                    }
                                    {
                                        post?.title && <Heading as="h1"
                                            fontSize={['50px']}
                                            lineHeight={['54px']}
                                            fontWeight={500}
                                            maxHeight={['104px']}
                                            overflow="hidden"
                                            textOverflow="ellipsis">
                                            {post?.title}
                                        </Heading>
                                    }
                                </Column>
                            </Row>
                        </Container>
                    </Box>
                </Flex><Box position="relative" marginTop="-160px">
                    <Container>
                        <Row justify="center">
                            <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths]}>
                                <Image image={post?.image} />
                                {
                                    (post?.image?.title) && <Text variant="annotation"  mt={2} mb={0}>
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
                            <Column width={[ColumnWidth.Full, ColumnWidth.TenTwelfths, ,ColumnWidth.Half]}>
                                <Flex h={['376px']} align="flex-end" zIndex={zIndex.heroHeading} position="relative">
                                    <Box mb={['40px', ,'50px', '60px']}>
                                        {
                                            post?.title && <Heading as="h1"
                                                fontSize={['50px']}
                                                lineHeight={['54px']}
                                                fontWeight={500}
                                                overflow="hidden"
                                                color="charcoal"
                                                textOverflow="ellipsis">
                                                {post?.title}
                                            </Heading>
                                        }
                                        {
                                            <Text color="charcoalBlur" mb={0}>
                                                {annotation}
                                            </Text>
                                        }
                                    </Box>

                                </Flex>
                            </Column>
                        </Row>
                    </Container>
                    <Box position="absolute" top="0" left={['30%', '40%', ,'60%']} height="100%">
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
                        <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
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
