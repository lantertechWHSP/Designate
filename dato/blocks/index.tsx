import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';
import { heroRecord } from '~/dato/blocks/hero';
import { cardContainerRecord } from '~/dato/blocks/cardContainer';
import { overviewRecord } from '~/dato/blocks/overview';
import { accordionRecord } from '~/dato/blocks/accordion';
import { latestNewsRecord } from '~/dato/blocks/latestNews';
import { investorPanelRecord } from '~/dato/blocks/investorPanel';
import { homePageOverviewRecord } from '~/dato/blocks/homePageOverview';
import { dividendsPanelRecord } from '~/dato/blocks/dividendsPanel';
import { sharePricePanelRecord } from '~/dato/blocks/sharePricePanel';
import { shareQuoteTableRecord } from '~/dato/blocks/shareQuoteTable';
import { shareHistoricalPricesTableRecord } from '~/dato/blocks/shareHistoricalPricesTable';
import { asxAnnouncementsPanelRecord } from '~/dato/blocks/asxAnnouncementsPanel';
import { contactsPanelRecord } from '~/dato/blocks/contactsPanel';
import { rectangleCardRecord } from '~/dato/blocks/rectangleCard';
import { companyValuesPanelRecord } from '~/dato/blocks/companyValuesPanel';
import { dividendHistoryRecord } from "~/dato/blocks/dividendHistory";
import { shareholderReturnsTableRecord } from "~/dato/blocks/shareholderReturnsTable";
import { shareholderReturnsChartRecord } from "~/dato/blocks/shareholderReturnsChart";

export const blocks:string = `
    blocks {
        ... on TextRecord {
            ${textRecord}
        }
        ... on ImageRecord {
            ${imageRecord}
        }
        ... on VideoRecord {
            ${videoRecord}
        }
        ... on AudioRecord {
            ${audioRecord}
        }
        ... on HeroRecord {
            ${heroRecord}
        }
        ... on CardContainerRecord {
            ${cardContainerRecord}
        }
        ... on OverviewRecord {
            ${overviewRecord}
        }
        ... on AccordionRecord {
            ${accordionRecord}
        }
        ... on LatestNewsRecord {
            ${latestNewsRecord}
        }
        ... on InvestorPanelRecord {
            ${investorPanelRecord}
        }
        ... on HomePageOverviewRecord {
            ${homePageOverviewRecord}
        }
        ... on DividendHistoryRecord {
            ${dividendHistoryRecord}
        }
        ... on ShareholderReturnsTableRecord {
            ${shareholderReturnsTableRecord}
        }
        ... on ShareholderReturnsChartRecord {
            ${shareholderReturnsChartRecord}
        }
        ... on DividendsPanelRecord {
            ${dividendsPanelRecord}
        }
        ... on SharePricePanelRecord {
            ${sharePricePanelRecord}
        }
        ... on ShareQuoteTableRecord {
            ${shareQuoteTableRecord}
        }
        ... on ShareHistoricalPricesTableRecord {
            ${shareHistoricalPricesTableRecord}
        }
        ... on AsxAnnouncementsPanelRecord {
            ${asxAnnouncementsPanelRecord}
        }
        ... on ContactsPanelRecord {
            ${contactsPanelRecord}
        }
        ... on CompanyValuesPanelRecord {
            ${companyValuesPanelRecord}
        }
        ... on RectangleCardRecord {
            ${rectangleCardRecord}
        }
    }
`;
