import React, {ReactNode} from 'react';
import {Box, Container} from '@chakra-ui/react';
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/SharePriceChart';
import {Column, ColumnWidth, Row} from "~/components/elements/grid/grid";

const SharePricePanelBlock:any = () : ReactNode => {
    return <Box background="lightGrey3" py={[6, 8, 12]}>
        <Container>
            <Row>
                <Column width={[ColumnWidth.Full, , , ColumnWidth.FiveTwelfths]}>
                    <SharePriceOverview />
                </Column>
                <Column width={[ColumnWidth.Full, , , ColumnWidth.SevenTwelfths]}>
                    <SharePriceChart />
                </Column>
            </Row>
        </Container>
    </Box>;
};

export default SharePricePanelBlock;
