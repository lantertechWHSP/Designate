import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import PageLinks from '~/components/site/PageLinks';
import { Heading, Container, Flex, Box } from '@chakra-ui/react';
import { SubscriptionForm } from '~/components/elements/mailchimp/subscriptionForm';

const Layout:any = ({ layout, children }:any) : ReactNode => {
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
            {
                layout.isHomePage && <SubscriptionForm />
            }
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default Layout;
