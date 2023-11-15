import React, { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from "~/components/blocks/Content";
import SharePriceOverview from '~/components/blocks/SharePricePanel/SharePriceOverview';
import SharePriceChart from '~/components/blocks/SharePricePanel/SharePriceChart';
import { Column, Row, ColumnWidth } from '~/components/elements/grid/grid';

interface ISharePricePanelBlock extends IBlock {
}

const SharePricePanelBlock:any = ({ background, paddingTop, paddingBottom }:ISharePricePanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.FourTwelvfths]} marginRight={[0, , ,ColumnWidth.Twelfth]}>
                <SharePriceOverview />
            </Column>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.SevenTwelfths]}>
                <SharePriceChart />
            </Column>
        </Row>
    </ContentBlock>;
};

export default SharePricePanelBlock;
