import React, { ReactNode } from 'react';
import { Container, Box, Grid, GridItem, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/charts/SharePriceChart/SharePriceChart';

const SharePricePanel = () : ReactNode => {
    return <Box background="lightGrey3" py={8}>
        <Container>
            <Grid templateColumns='repeat(5, 1fr)'
                  gap={8}>
                <GridItem colSpan={2}>
                    <SharePriceOverview />
                </GridItem>
                <GridItem colSpan={3}>
                    <Tabs>
                        <TabList>
                            <Tab>
                                Share Price
                            </Tab>
                            <Tab>
                                Total Shareholder Return
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SharePriceChart />
                            </TabPanel>
                            <TabPanel>
                                Wonder
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
            </Grid>
        </Container>
    </Box>;
};

export default SharePricePanel;
