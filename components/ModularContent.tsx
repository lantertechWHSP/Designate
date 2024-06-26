// General
import TextBlock from '~/components/blocks/Text';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from '~/components/blocks/Video';
import AudioBlock from '~/components/blocks/Audio';
import OverviewBlock from '~/components/blocks/Overview';
import CardPanelBlock from '~/components/blocks/CardPanel';
import ContentCardPanelBlock from '~/components/blocks/ContentCardPanel';
import AccordionBlock from '~/components/blocks/Accordion';
import CarouselBlock from '~/components/blocks/Carousel';
import HorizontalRuleBlock from '~/components/blocks/HorizontalRule';
import AttributesListPanelBlock from '~/components/blocks/AttributesListPanel';

import DocumentHeroPanelBlock from '~/components/blocks/DocumentHeroPanel';
import CompanyValuesPanelBlock from '~/components/blocks/CompanyValuesPanel';
import LatestPostsPanelBlock from '~/components/blocks/LatestPosts/LatestPostsPanel';
import ContactsPanelBlock from '~/components/blocks/ContactsPanel/ContactsPanel';
import InvestorPanelBlock from '~/components/blocks/InvestorPanel';
import EventListPanelBlock from '~/components/blocks/EventListPanel';

// Home
import HeroBlock from '~/components/blocks/Hero';
import HomePageImageGalleryBlock from '~/components/blocks/HomePageImageGallery';
import AsxAnnouncementsPanelBlock from '~/components/blocks/AsxAnnouncementsPanel';
import SeeAlsoPanelBlock from '~/components/blocks/SeeAlsoPanel';

// About/Track Record
import TrackRecordTableBlock from '~/components/blocks/TrackRecordTable';
import TrackRecordChartBlock from '~/components/blocks/TrackRecordChart';
import TrackRecordDividendBlock from '~/components/blocks/TrackRecordDividend';

// About/Investment Approach
import InvestmentPortfolioTableBlock from '~/components/blocks/InvestmentPortfolioTable';
import ObjectivePanelBlock from '~/components/blocks/ObjectivePanel';

// About/Investment Portfolio
import PortfolioPanelBlock from '~/components/blocks/PortfolioPanel';

// About/Sustainability
import SustainabilityPanelBlock from '~/components/blocks/SustainabilityPanel';

// Investor Center/ ASX Announcements
import AsxNewsletterFormPanelBlock from '~/components/blocks/AsxNewsletterFormPanel';

// Investor Center/Share Price
import SharePricePanelBlock from '~/components/blocks/SharePricePanel/SharePricePanel';
import ShareQuoteTableBlock from '~/components/blocks/ShareQuoteTable';
import ShareHistoricalPricesTableBlock from '~/components/blocks/ShareHistoricalPricesTable';

// Investor Center/Key Dates
import EventRsvpFormPanelBlock from '~/components/blocks/EventRsvpFormPanel';

// Investor Center/Dividends
import DividendHistoryTableBlock from '~/components/blocks/DividendHistoryTable';
import DividendLatestTableBlock from '~/components/blocks/DividendLatestTable';
import DividendGrowthChartBlock from '~/components/blocks/DividendGrowthChart';

import ComputershareContactPanelBlock from '~/components/blocks/ComputershareContactPanel';

// Investor Center/ FAQ’s
import FaqsPanelBlock from "~/components/blocks/FaqsPanel";

// People and Governance
import ProfilesPanelBlock from '~/components/blocks/ProfilesPanel/ProfilesPanel';

// People and Governance / Policies
import DocumentPoliciesListBlock from '~/components/blocks/DocumentPoliciesList';

const blocks:any = {
    // General
    TextBlock,
    ImageBlock,
    VideoBlock,
    AudioBlock,
    OverviewBlock,
    CardPanelBlock,
    ContentCardPanelBlock,
    AccordionBlock,
    CarouselBlock,
    HorizontalRuleBlock,
    AttributesListPanelBlock,

    DocumentHeroPanelBlock,
    CompanyValuesPanelBlock,
    LatestPostsPanelBlock,
    ContactsPanelBlock,
    InvestorPanelBlock,
    EventListPanelBlock,

    // Home
    HeroBlock,
    HomePageImageGalleryBlock,
    AsxAnnouncementsPanelBlock,
    SeeAlsoPanelBlock,

    // About/Track Record
    TrackRecordTableBlock,
    TrackRecordChartBlock,
    TrackRecordDividendBlock,

    // About/Investment Approach
    InvestmentPortfolioTableBlock,
    ObjectivePanelBlock,

    // About/Investment Portfolio
    PortfolioPanelBlock,

    // About/Sustainability
    SustainabilityPanelBlock,

    // Investor Center/ ASX Announcements
    AsxNewsletterFormPanelBlock,

    // Investor Center/SharePrice
    SharePricePanelBlock,
    ShareQuoteTableBlock,
    ShareHistoricalPricesTableBlock,

    // Investor Center/Key Dates
    EventRsvpFormPanelBlock,

    // Investor Center/Dividends
    DividendHistoryTableBlock,
    DividendLatestTableBlock,
    DividendGrowthChartBlock,

    // Investor Center/Share Registry
    ComputershareContactPanelBlock,

    // investor Center/FAQ’s
    FaqsPanelBlock,

    // People and Governance
    ProfilesPanelBlock,

    // People and Governance / Policies
    DocumentPoliciesListBlock,
};

export const getBlock:any = (name:any) : any => {
    return blocks[name?.replace(/Record$/, 'Block')];
};

export const ModularContent:any = ({ content, contain = true }) : any => {
    if (!content || content === null || !Array.isArray(content)) {
        return null;
    }

    return content.map((block) => {
        const Block:any = getBlock(block.__typename);
        if (!Block) return null;
        return <Block key={block.id} {...block} contain={contain} />;
    });
};
