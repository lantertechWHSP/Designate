import React, { ReactNode } from 'react';
import Meta from '~/components/layouts/Meta';
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';
import { Heading, Container, Flex, Box } from '@chakra-ui/react';

const Default = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
            <Box>
                <Container>
                    {
                        layout.title && <Heading as='h1' variant="h1">
                            {
                                layout.title
                            }
                        </Heading>
                    }
                </Container>
                <>
                    {children}
                </>
            </Box>
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default Default;
