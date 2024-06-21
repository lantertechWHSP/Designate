import React, {ReactNode, useState} from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { DateTime } from 'luxon';
import SocialShare from '~/components/elements/socialShare';
import Preview from '~/components/site/Preview';
import VectorEffect from '~/components/elements/shapes/VectorEffect';
import { zIndex } from '~/lib/theme/theme';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

const PostPageLayout:any = ({ layout, post, children }:any) : ReactNode => {
    const [annotation] = useState((() => {
        const date:string = layout?.page?.publishDate ? DateTime.fromISO(layout?.page?.publishDate).toFormat('MMM d, yyyy') : '';

        if (post?.author?.name && date) {
            return `${post?.author?.name}, ${date}`;
        }
        else if (post?.author?.name) {
            return post?.author?.name;
        }
        else if(date) {
            return date;
        }
        return '';
    })());

    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            {
                layout?.preview && <Preview />
            }
            <Header announcement={layout?.announcement} menu={layout?.menu} />
            <Box h={['376px']}
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
                                            fontSize={['32px', , ,'44px', '50px']}
                                            lineHeight={['36px', , ,'48px', '54px']}
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
                                                <Box>
                                                    {annotation}
                                                </Box>
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
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default PostPageLayout;
