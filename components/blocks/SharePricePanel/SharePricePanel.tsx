import React, { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from "~/components/blocks/Content";
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/SharePriceChart';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';

interface ISharePricePanelBlock extends IBlock {
}

const SharePricePanelBlock:any = ({ paddingTop, paddingBottom }:ISharePricePanelBlock) : ReactNode => {
    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.FourTwelvfths]}>
                <SharePriceOverview />
            </Column>
            <Column width={[ColumnWidth.Full, , , ColumnWidth.EightTwelfths]}>
                <SharePriceChart />
            </Column>
        </Row>
    </ContentBlock>;
};

export default SharePricePanelBlock;
