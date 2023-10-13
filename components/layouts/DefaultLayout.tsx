import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import PageLinks from '~/components/site/PageLinks';
import { Heading, Container, Flex, Box } from '@chakra-ui/react';
import { SubscriptionForm } from '~/components/elements/mailchimp/subscriptionForm';
import VectorEffect from '~/components/elements/shapes/VectorEffect';

const DefaultLayout:any = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header darkTheme={layout.darkTheme} menu={layout?.menu} />
            <Box flex="1">
                {
                    !layout.isHomePage && <Box h={['376px']}
                                                position="relative"
                                                backgroundImage={`url('/images/layouts/background.png')`}
                                                backgroundPosition="center"
                                                backgroundSize="cover">
                        <Container>
                            <Flex h={['376px']} align="flex-end" py={8}>
                                {
                                    layout.title && <Heading as="h1" variant="defaultLayoutTitle">
                                        {layout.title}
                                  </Heading>
                                }
                            </Flex>
                        </Container>
                        <Box position="absolute" top="0" left="60%" height="100%">
                            <VectorEffect />
                        </Box>
                    </Box>
                }
                {
                    children && <Box>
                        {children}
                    </Box>
                }
            </Box>
            {
                layout.isHomePage && <PageLinks current={layout?.breadcrumbs[0]?.node} />
            }
            {
                layout.isHomePage && <SubscriptionForm />
            }
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default DefaultLayout;
