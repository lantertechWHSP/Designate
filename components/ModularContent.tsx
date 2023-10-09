import Text from '~/components/blocks/Text';
import Image from '~/components/blocks/Image';
import Video from '~/components/blocks/Video';
import Audio from '~/components/blocks/Audio';

import Card from '~/components/blocks/CardContainer/Card';
import CardContainer from '~/components/blocks/CardContainer/CardContainer';
import RectangleCard from '~/components/blocks/RectangleCard';

import Overview from '~/components/blocks/Overview';

import Accordion from '~/components/blocks/Accordion/Accordion';

import Hero from '~/components/blocks/Hero';
import HomePageOverview from '~/components/blocks/HomePageOverview';
import LatestNews from '~/components/blocks/LatestNews/LatestNews';
import InvestorPanel from '~/components/blocks/InvestorPanel';
import AsxAnnouncementsPanel from '~/components/blocks/AsxAnnouncementsPanel';

import ContactsPanel from '~/components/blocks/ContactsPanel/ContactsPanel';
import CompanyValuesPanel from '~/components/blocks/CompanyValuesPanel';

import DividendHistory from '~/components/blocks/DividendHistory';
import ShareholderReturnsTable from '~/components/blocks/ShareholderReturnsTable';
import ShareholderReturnsChart from '~/components/blocks/ShareholderReturnsChart';

import DividendsPanel from '~/components/blocks/DividendsPanel/DividendsPanel';
import SharePricePanel from '~/components/blocks/SharePricePanel/SharePricePanel';
import ShareQuoteTable from '~/components/blocks/ShareQuoteTable';
import ShareHistoricalPricesTable from '~/components/blocks/ShareHistoricalPricesTable';

const blocks:any = {
    Text,
    Image,
    Video,
    Audio,
    Card,
    CardContainer,
    RectangleCard,
    Overview,
    Accordion,

    Hero,
    HomePageOverview,
    LatestNews,
    InvestorPanel,
    AsxAnnouncementsPanel,
    ContactsPanel,
    CompanyValuesPanel,

    DividendHistory,
    ShareholderReturnsTable,
    ShareholderReturnsChart,

    DividendsPanel,
    SharePricePanel,
    ShareQuoteTable,
    ShareHistoricalPricesTable
};

export const getBlock:any = (name:any) : any => {
    return blocks[name?.replace('Record', '')];
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
