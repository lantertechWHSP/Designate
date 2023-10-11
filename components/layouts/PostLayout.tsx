import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import SiteHeader from '~/components/site/SiteHeader';
import SiteFooter from '~/components/site/SiteFooter';
import { Flex, Box, Heading, Container, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import SocialShare from '~/components/elements/socialShare';

const PostLayout:any = ({ layout, post, children }:any) : ReactNode => {
    const date:string = DateTime.fromFormat(layout?.page?.publishDate, 'yyyy-mm-dd').toFormat('DDD');
    const annotation:string = [post?.author, date].join(', ');

    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <SiteHeader menu={layout?.menu} />
            <Flex background="steelBlue2" h={['600px']} direction="column" textAlign="center" align="center" justify="center" sx={{
                backgroundImage: layout?.page?.image?.responsiveImage?.src,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Box>
                    <Container maxW="container.narrow">
                        {
                            post?.title && <Heading as="h1" color="white" fontSize="46px" lineHeight="60px">
                                {post?.title}
                            </Heading>
                        }

                        <Box mt={2}>
                            {
                                annotation && <Text color="white">
                                    {annotation}
                                </Text>
                            }
                        </Box>
                    </Container>
                </Box>
            </Flex>
            <Box flex="1">
                {
                    children && <Box py={8}>
                        {children}
                    </Box>
                }
            </Box>
            <Box mb={16}>
                <Container maxW="container.narrow">
                    <SocialShare />
                </Container>
            </Box>
            <SiteFooter {...layout?.footer} />
        </Flex>
    );
};

export default PostLayout;
