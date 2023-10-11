import React, { ReactNode } from 'react';
import Meta from '~/components/site/Meta';
import SiteHeader from '~/components/site/SiteHeader';
import SiteFooter from '~/components/site/SiteFooter';
import { Flex, Box } from '@chakra-ui/react';

const PlainLayout:any = ({ layout, children }:any) : ReactNode => {
    return (
        <Flex minHeight="100vh" direction="column">
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <SiteHeader menu={layout?.menu} />
            <Box flex="1">
                {
                    children && <>
                        {children}
                    </>
                }
            </Box>
            <SiteFooter {...layout?.footer} />
        </Flex>
    );
};

export default PlainLayout;
