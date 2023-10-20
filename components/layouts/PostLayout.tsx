import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Flex, Heading, Container, Box, Text } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { DateTime } from 'luxon';
import { Image } from '~/components/elements/image';
import SocialShare from '~/components/elements/socialShare';

const PostLayout:any = ({ layout, post, children }:any) : ReactNode => {
    const date:string = DateTime.fromFormat(layout?.page?.publishDate, 'yyyy-mm-dd').toFormat('DDD');

    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
            <Flex width="100%"
                height={['550px']}
                background="linear-gradient(270deg, #50513C 0%, rgba(228, 221, 193, 0.50) 100%)"
                align="flex-end">
                <Box width="100%" marginBottom="200px">
                    <Container>
                        <Row justify="center">
                            <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                {
                                    post?.author || date && <Text color="blackBlur">
                                        {
                                            (() => {
                                                if (post?.author && date) {
                                                    return <>{post?.author}, {date}</>;
                                                }
                                                else if (post?.author) {
                                                    return post?.author;
                                                }
                                                else if(date) {
                                                    return date;
                                                }
                                            })()
                                        }
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
            </Flex>
            <Box position="relative" marginTop="-160px">
                <Container>
                    <Row justify="center">
                        <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths]}>
                            <Image image={post?.image} />
                        </Column>
                    </Row>
                </Container>
            </Box>
            {
                children && <Box>
                    {children}
                </Box>
            }
            <Box mb={16}>
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
