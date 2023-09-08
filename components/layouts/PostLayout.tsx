import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Flex, Box, Heading } from '@chakra-ui/react';

const PostLayout:any = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
            <Flex background="steelBlue2" h={['600px']} direction="column" justify="flex-end" sx={{
                backgroundImage: layout?.page?.image?.responsiveImage?.src,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                {
                    layout.page?.title && <Heading>
                        {layout.post?.title}
                    </Heading>
                }
            </Flex>
            <Box flex="1">
                {
                    children && <Box py={8}>
                        {children}
                    </Box>
                }
            </Box>
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default PostLayout;
