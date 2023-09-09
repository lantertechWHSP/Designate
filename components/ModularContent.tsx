import Text from '~/components/blocks/Text';
import Image from '~/components/blocks/Image';
import Video from '~/components/blocks/Video';
import Audio from '~/components/blocks/Audio';

import Card from '~/components/blocks/CardContainer/Card';
import CardContainer from '~/components/blocks/CardContainer/CardContainer';

import Overview from '~/components/blocks/Overview';

import Hero from '~/components/blocks/Hero';
import HomePageOverview from '~/components/blocks/HomePageOverview';
import LatestNews from '~/components/blocks/LatestNews/LatestNews';
import InvestorPanel from '~/components/blocks/InvestorPanel';
import AsxAnnouncementsPanel from '~/components/blocks/AsxAnnouncementsPanel';

import KeyDatesPanel from "~/components/blocks/KeyDatesPanel";

import ContactsPanel from '~/components/blocks/ContactsPanel/ContactsPanel';

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
    Overview,

    Hero,
    HomePageOverview,
    LatestNews,
    InvestorPanel,
    AsxAnnouncementsPanel,
    KeyDatesPanel,
    ContactsPanel,
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
