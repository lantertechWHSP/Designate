import React, { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Container } from '@chakra-ui/react';
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/SharePriceChart';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';

interface ISharePricePanelBlock extends IBlock, ChakraProps {
}

const SharePricePanelBlock:any = ({}:ISharePricePanelBlock) : ReactNode => {
    return <Box background="lightGrey3">
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
