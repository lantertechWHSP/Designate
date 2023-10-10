import TextBlock from '~/components/blocks/Text';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from '~/components/blocks/Video';
import AudioBlock from '~/components/blocks/Audio';

import CardBlock from '~/components/blocks/CardContainer/Card';
import CardContainerBlock from '~/components/blocks/CardContainer/CardContainer';
import RectangleCardBlock from '~/components/blocks/RectangleCard';

import OverviewBlock from '~/components/blocks/Overview';

import AccordionBlock from '~/components/blocks/Accordion';

import HeroBlock from '~/components/blocks/Hero';
import HomePageOverviewBlock from '~/components/blocks/HomePageOverview';
import LatestNewsBlock from '~/components/blocks/LatestNews/LatestNews';
import InvestorPanelBlock from '~/components/blocks/InvestorPanel';
import AsxAnnouncementsPanelBlock from '~/components/blocks/AsxAnnouncementsPanel';

import ContactsPanelBlock from '~/components/blocks/ContactsPanel/ContactsPanel';
import CompanyValuesPanelBlock from '~/components/blocks/CompanyValuesPanel';

import DividendHistoryBlock from '~/components/blocks/DividendHistory';
import ShareholderReturnsTableBlock from '~/components/blocks/ShareholderReturnsTable';
import ShareholderReturnsChartBlock from '~/components/blocks/ShareholderReturnsChart';

import DividendsPanelBlock from '~/components/blocks/DividendsPanel/DividendsPanel';
import SharePricePanelBlock from '~/components/blocks/SharePricePanel/SharePricePanel';
import ShareQuoteTableBlock from '~/components/blocks/ShareQuoteTable';
import ShareHistoricalPricesTableBlock from '~/components/blocks/ShareHistoricalPricesTable';

const blocks:any = {
    TextBlock,
    ImageBlock,
    VideoBlock,
    AudioBlock,
    CardBlock,
    CardContainerBlock,
    RectangleCardBlock,
    OverviewBlock,
    AccordionBlock,

    HeroBlock,
    HomePageOverviewBlock,
    LatestNewsBlock,
    InvestorPanelBlock,
    AsxAnnouncementsPanelBlock,
    ContactsPanelBlock,
    CompanyValuesPanelBlock,

    DividendHistoryBlock,
    ShareholderReturnsTableBlock,
    ShareholderReturnsChartBlock,

    DividendsPanelBlock,
    SharePricePanelBlock,
    ShareQuoteTableBlock,
    ShareHistoricalPricesTableBlock
};

export const getBlock:any = (name:any) : any => {
    return blocks[name?.replace('Record', 'Block')];
};

export const ModularContent:any = ({ content }) : any => {
    if (!content || content === null || !Array.isArray(content)) {
        return null;
    }

    return content.map((block) => {
        const Block:any = getBlock(block.__typename);
        if (!Block) return null;
        return <Block key={block.id} {...block} />;
    });
};
