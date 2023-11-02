import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import Header from '~/components/site/Header';
import Footer from '~/components/site/Footer';
import { Flex, Box } from '@chakra-ui/react';
import Preview from "~/components/site/Preview";

const PlainLayout:any = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column"  overflowX="hidden">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            {
                layout?.preview && <Preview />
            }
            <Header darkTheme={layout?.darkTheme} menu={layout?.menu} />
            <Box flex="1">
                {
                    children && <>
                        {children}
                    </>
                }
            </Box>
            <Footer {...layout?.footer} />
        </Flex>
    );
};

export default PlainLayout;
