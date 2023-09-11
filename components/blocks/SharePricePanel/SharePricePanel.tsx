import React, { ReactNode } from 'react';
import { Container, Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/charts/SharePriceChart/SharePriceChart';
// import { DateTime } from 'luxon';

const SharePricePanel:any = () : ReactNode => {
    // const data:any = {
    //     lines: [
    //         [
    //             {
    //                 date: DateTime.fromFormat('01/01/2019', "d/M/yyyy"),
    //                 value: 410
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2020', "d/M/yyyy"),
    //                 value: 650
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2021', "d/M/yyyy"),
    //                 value: 800
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2022', "d/M/yyyy"),
    //                 value: 900
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2023', "d/M/yyyy"),
    //                 value: 1000
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2024', "d/M/yyyy"),
    //                 value: 1250
    //             }
    //         ],
    //         [
    //             {
    //                 date: DateTime.fromFormat('01/01/2019', "d/M/yyyy"),
    //                 value: 700
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2020', "d/M/yyyy"),
    //                 value: 840
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2021', "d/M/yyyy"),
    //                 value: 700
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/01/2022', "d/M/yyyy"),
    //                 value: 800
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/06/2023', "d/M/yyyy"),
    //                 value: 950
    //             },
    //             {
    //                 date: DateTime.fromFormat('01/06/2024', "d/M/yyyy"),
    //                 value: 950
    //             }
    //         ]
    //     ]
    // };

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

export default SharePricePanel;
