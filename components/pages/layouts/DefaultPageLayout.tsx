import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import PageLinks from '~/components/site/PageLinks';
import Preview from "~/components/site/Preview";
import { Heading, Container, Flex, Box } from '@chakra-ui/react';
import VectorEffect from '~/components/elements/shapes/VectorEffect';
import { zIndex } from '~/lib/theme/theme';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

const DefaultPageLayout:any = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column" overflowX="hidden">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            {
                layout?.preview && <Preview />
            }
            <Header darkTheme={layout?.darkTheme} menu={layout?.menu} />
            <Box flex="1">
                {
                    !layout?.isHomePage && <Box h={['376px']}
                        position="relative"
                        background="linear-gradient(270deg, #50513C 0%, rgba(228, 221, 193, 0.50) 100%)">
                        <Container>
                            <Flex h={['376px']} align="flex-end" zIndex={zIndex.heroHeading} position="relative">
                                {
                                    layout?.title && <Heading as="h1" variant="defaultLayoutTitle" mb={['40px', ,'50px', '60px']}>
                                        <AnimateOverflow>{layout.title}</AnimateOverflow>
                                    </Heading>
                                }
                            </Flex>
                        </Container>
                        <Box position="absolute" top="0" left={['0', '30%', '40%', ,'60%']} height="100%">
                            <VectorEffect />
                        </Box>
                    </Box>
                }
                {
                    children && <>
                        {children}
                    </>
                }
            </Box>
            {
                layout?.isHomePage && <PageLinks current={layout?.breadcrumbs[0]?.node} />
            }
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default DefaultPageLayout;
