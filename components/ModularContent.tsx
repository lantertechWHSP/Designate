// General
import TextBlock from '~/components/blocks/Text';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from '~/components/blocks/Video';
import AudioBlock from '~/components/blocks/Audio';
import CardContainerBlock from '~/components/blocks/CardContainer/CardContainer';
import OverviewBlock from '~/components/blocks/Overview';
import AccordionBlock from '~/components/blocks/Accordion';
import CarouselBlock from '~/components/blocks/Carousel';

import DocumentHeroPanelBlock from '~/components/blocks/DocumentHeroPanel';
import CompanyValuesPanelBlock from '~/components/blocks/CompanyValuesPanel';
import LatestNewsBlock from '~/components/blocks/LatestNews/LatestNews';
import ContactsPanelBlock from '~/components/blocks/ContactsPanel/ContactsPanel';
import InvestorPanelBlock from '~/components/blocks/InvestorPanel';

// Home
import HeroBlock from '~/components/blocks/Hero';
import HomePageOverviewBlock from '~/components/blocks/HomePageOverview';
import AsxAnnouncementsPanelBlock from '~/components/blocks/AsxAnnouncementsPanel';

// About/Track Record
import TrackRecordTableBlock from '~/components/blocks/TrackRecordTable';
import TrackRecordChartBlock from '~/components/blocks/TrackRecordChart';
import TrackRecordDividendBlock from '~/components/blocks/TrackRecordDividend';

// About/Investment Approach
import InvestmentPhilosophyBlock from '~/components/blocks/InvestmentPhilosophy';
import InvestmentPortfolioTableBlock from '~/components/blocks/InvestmentPortfolioTable';

// About/Investment Portfolio
import PeoplePanelBlock from '~/components/blocks/PeoplePanel';

// Investor Center/Dividends
import DividendHistoryTableBlock from '~/components/blocks/DividendHistoryTable';
import DividendLatestTableBlock from '~/components/blocks/DividendLatestTable';
import DividendGrowthChartBlock from '~/components/blocks/DividendGrowthChart';

import SharePricePanelBlock from '~/components/blocks/SharePricePanel/SharePricePanel';
import ShareQuoteTableBlock from '~/components/blocks/ShareQuoteTable';
import ShareHistoricalPricesTableBlock from '~/components/blocks/ShareHistoricalPricesTable';

const blocks:any = {
    // General
    TextBlock,
    ImageBlock,
    VideoBlock,
    AudioBlock,
    CardContainerBlock,
    OverviewBlock,
    AccordionBlock,
    CarouselBlock,

    DocumentHeroPanelBlock,
    CompanyValuesPanelBlock,
    LatestNewsBlock,
    ContactsPanelBlock,
    InvestorPanelBlock,

    // Home
    HeroBlock,
    HomePageOverviewBlock,
    AsxAnnouncementsPanelBlock,

    // About/Track Record
    TrackRecordTableBlock,
    TrackRecordChartBlock,
    TrackRecordDividendBlock,

    // About/Investment Approach
    InvestmentPhilosophyBlock,
    InvestmentPortfolioTableBlock,

    // About/Investment Portfolio
    PeoplePanelBlock,

    // Investor Center/Dividends
    DividendHistoryTableBlock,
    DividendLatestTableBlock,
    DividendGrowthChartBlock,

    SharePricePanelBlock,
    ShareQuoteTableBlock,
    ShareHistoricalPricesTableBlock
};

export const getBlock:any = (name:any) : any => {
    return blocks[name?.replace(/Record$/, 'Block')];
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
