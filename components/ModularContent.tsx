// General
import TextBlock from '~/components/blocks/Text';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from '~/components/blocks/Video';
import AudioBlock from '~/components/blocks/Audio';
import OverviewBlock from '~/components/blocks/Overview';
import CardPanelBlock from '~/components/blocks/CardPanel';
import AccordionBlock from '~/components/blocks/Accordion';
import CarouselBlock from '~/components/blocks/Carousel';

import DocumentHeroPanelBlock from '~/components/blocks/DocumentHeroPanel';
import CompanyValuesPanelBlock from '~/components/blocks/CompanyValuesPanel';
import LatestNewsBlock from '~/components/blocks/LatestNews/LatestNews';
import ContactsPanelBlock from '~/components/blocks/ContactsPanel/ContactsPanel';
import InvestorPanelBlock from '~/components/blocks/InvestorPanel';
import KeyDatesPanelBlock from '~/components/blocks/KeyDatesPanel';

// Home
import HeroBlock from '~/components/blocks/Hero';
import HomePageOverviewBlock from '~/components/blocks/HomePageOverview';
import AsxAnnouncementsPanelBlock from '~/components/blocks/AsxAnnouncementsPanel';
import SeeAlsoPanelBlock from '~/components/blocks/SeeAlsoPanel';

// About/Track Record
import TrackRecordTableBlock from '~/components/blocks/TrackRecordTable';
import TrackRecordChartBlock from '~/components/blocks/TrackRecordChart';
import TrackRecordDividendBlock from '~/components/blocks/TrackRecordDividend';

// About/Investment Approach
import InvestmentPhilosophyBlock from '~/components/blocks/InvestmentPhilosophy';
import InvestmentPortfolioTableBlock from '~/components/blocks/InvestmentPortfolioTable';
import ObjectivePanelBlock from '~/components/blocks/ObjectivePanel';

// About/Investment Portfolio
import PeoplePanelBlock from '~/components/blocks/PeoplePanel';

// Investor Center/Share Price
import SharePricePanelBlock from '~/components/blocks/SharePricePanel/SharePricePanel';
import ShareQuoteTableBlock from '~/components/blocks/ShareQuoteTable';
import ShareHistoricalPricesTableBlock from '~/components/blocks/ShareHistoricalPricesTable';

// Investor Center/Dividends
import DividendHistoryTableBlock from '~/components/blocks/DividendHistoryTable';
import DividendLatestTableBlock from '~/components/blocks/DividendLatestTable';
import DividendGrowthChartBlock from '~/components/blocks/DividendGrowthChart';

const blocks:any = {
    // General
    TextBlock,
    ImageBlock,
    VideoBlock,
    AudioBlock,
    OverviewBlock,
    CardPanelBlock,
    AccordionBlock,
    CarouselBlock,

    DocumentHeroPanelBlock,
    CompanyValuesPanelBlock,
    LatestNewsBlock,
    ContactsPanelBlock,
    InvestorPanelBlock,
    KeyDatesPanelBlock,

    // Home
    HeroBlock,
    HomePageOverviewBlock,
    AsxAnnouncementsPanelBlock,
    SeeAlsoPanelBlock,

    // About/Track Record
    TrackRecordTableBlock,
    TrackRecordChartBlock,
    TrackRecordDividendBlock,

    // About/Investment Approach
    InvestmentPhilosophyBlock,
    InvestmentPortfolioTableBlock,
    ObjectivePanelBlock,

    // About/Investment Portfolio
    PeoplePanelBlock,

    // Investor Center/SharePrice
    SharePricePanelBlock,
    ShareQuoteTableBlock,
    ShareHistoricalPricesTableBlock,

    // Investor Center/Dividends
    DividendHistoryTableBlock,
    DividendLatestTableBlock,
    DividendGrowthChartBlock
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
