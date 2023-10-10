import React, { ReactNode } from 'react';
import { Container, Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/SharePriceChart';

const SharePricePanelBlock:any = () : ReactNode => {
    return <Box background="lightGrey3" py={8}>
        <Container>
            <Grid templateColumns='repeat(5, 1fr)' gap={8}>
                <GridItem colSpan={2}>
                    <SharePriceOverview />
                </GridItem>
                <GridItem colSpan={3}>
                    <Heading as="h2" variant="h3" mt={2} mb={4}>
                        Share Price
                    </Heading>
                    <SharePriceChart />
                </GridItem>
            </Grid>
        </Container>
    </Box>;
};

export default SharePricePanelBlock;
