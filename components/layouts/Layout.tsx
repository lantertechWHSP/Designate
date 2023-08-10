import React, { ReactNode } from 'react';
import Meta from '~/components/layouts/Meta';
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';
import PageLinks from '~/components/layouts/PageLinks';
import { Flex, Box } from '@chakra-ui/react';

const Layout = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
            <Box minH={'calc(100vh - 212px)'}>
                <>
                    {children}
                </>
            </Box>
            <PageLinks current={layout?.breadcrumbs[0]?.node}  />
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default Layout;
