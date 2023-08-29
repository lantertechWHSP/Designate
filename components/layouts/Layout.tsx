import React, { ReactNode } from 'react';
import Meta from '~/components/layouts/Meta';
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';
import PageLinks from '~/components/layouts/PageLinks';
import { Heading, Container, Flex, Box } from '@chakra-ui/react';

const Layout = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
            <Box minH={'calc(100vh - 212px)'}>
                {
                    !layout.isHomePage && <Flex background="steelBlue2" h={['350px']} direction="column" justify="flex-end">
                        <Box>
                            <Container>
                                <Heading as="h1" variant="h1" color="white" fontWeight={400} mb={12}>
                                    {
                                        layout.title
                                    }
                                </Heading>
                            </Container>
                        </Box>
                    </Flex>
                }
                {
                    children && <Box>
                        {children}
                    </Box>
                }
            </Box>
            <PageLinks current={layout?.breadcrumbs[0]?.node}  />
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default Layout;
