import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Flex, Box, Heading, Container, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import SocialShare from '~/components/elements/socialShare';

const PostLayout:any = ({ layout, children }:any) : ReactNode => {
    const date:string = DateTime.fromFormat(layout?.page?.publishDate, 'yyyy-mm-dd').toFormat('DDD');
    const annotation:string = [layout.page?.author, date].join(', ');

    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
            <Flex background="steelBlue2" h={['600px']} direction="column" textAlign="center" align="center" justify="center" sx={{
                backgroundImage: layout?.page?.image?.responsiveImage?.src,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Box>
                    <Container maxW="container.narrow">
                        {
                            layout.page?.title && <Heading as="h1" color="white" fontSize="46px" lineHeight="60px">
                                {layout.page?.title}
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
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default PostLayout;
