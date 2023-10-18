// General
import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';
import { overviewRecord } from '~/dato/blocks/overview';
import { cardPanelRecord } from '~/dato/blocks/cardPanel';
import { accordionRecord } from '~/dato/blocks/accordion';
import { carouselRecord } from '~/dato/blocks/carousel';

import { documentHeroPanelRecord } from '~/dato/blocks/documentHeroPanel';
import { companyValuesPanelRecord } from '~/dato/blocks/companyValuesPanel';
import { latestNewsRecord } from '~/dato/blocks/latestNews';
import { contactsPanelRecord } from '~/dato/blocks/contactsPanel';
import { investorPanelRecord } from '~/dato/blocks/investorPanel';
import { keyDatesPanelRecord } from '~/dato/blocks/keyDatesPanel';

// Home
import { heroRecord } from '~/dato/blocks/hero';
import { homePageOverviewRecord } from '~/dato/blocks/homePageOverview';
import { asxAnnouncementsPanelRecord } from '~/dato/blocks/asxAnnouncementsPanel';
import { seeAlsoPanelRecord } from '~/dato/blocks/seeAlsoPanel';

// About/Track Record
import { trackRecordTableRecord } from '~/dato/blocks/trackRecordTable';
import { trackRecordChartRecord } from '~/dato/blocks/trackRecordChart';
import { trackRecordDividendRecord } from '~/dato/blocks/trackRecordDividend';

// About/Investment Approach
import { investmentPhilosophyRecord } from '~/dato/blocks/investmentPhilosophy';
import { investmentPortfolioTableRecord } from '~/dato/blocks/investmentPortfolioTable';
import { objectivePanelRecord } from '~/dato/blocks/objectivePanel';

// About/Investment Portfolio
import { portfolioPanelRecord } from "~/dato/blocks/portfolioPanel";

// Investor Center/Share Price
import { sharePricePanelRecord } from '~/dato/blocks/sharePricePanel';
import { shareQuoteTableRecord } from '~/dato/blocks/shareQuoteTable';
import { shareHistoricalPricesTableRecord } from '~/dato/blocks/shareHistoricalPricesTable';

// Investor Center/Dividends
import { dividendHistoryTableRecord } from '~/dato/blocks/dividendHistoryTable';
import { dividendLatestTableRecord } from '~/dato/blocks/dividendLatestTable';
import { dividendGrowthChartRecord } from '~/dato/blocks/dividendGrowthChart';
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
        ... on OverviewRecord {
            ${overviewRecord}
        }
        ... on CardPanelRecord {
            ${cardPanelRecord}
        }
        ... on AccordionRecord {
            ${accordionRecord}
        }
        ... on CarouselRecord {
            ${carouselRecord}
        }

        ... on DocumentHeroPanelRecord {
            ${documentHeroPanelRecord}
        }
        ... on CompanyValuesPanelRecord {
            ${companyValuesPanelRecord}
        }
        ... on LatestNewsRecord {
            ${latestNewsRecord}
        }
        ... on ContactsPanelRecord {
            ${contactsPanelRecord}
        }
        ... on InvestorPanelRecord {
            ${investorPanelRecord}
        }
        ... on KeyDatesPanelRecord {
            ${keyDatesPanelRecord}
        }

        ... on HeroRecord {
            ${heroRecord}
        }
        ... on HomePageOverviewRecord {
            ${homePageOverviewRecord}
        }
        ... on AsxAnnouncementsPanelRecord {
            ${asxAnnouncementsPanelRecord}
        }
        ... on SeeAlsoPanelRecord {
            ${seeAlsoPanelRecord}
        }

        ... on TrackRecordTableRecord {
            ${trackRecordTableRecord}
        }
        ... on TrackRecordChartRecord {
            ${trackRecordChartRecord}
        }
        ... on TrackRecordDividendRecord {
            ${trackRecordDividendRecord}
        }
        
        ... on InvestmentPhilosophyRecord {
            ${investmentPhilosophyRecord}
        }
        ... on InvestmentPortfolioTableRecord {
            ${investmentPortfolioTableRecord}
        }
        ... on ObjectivePanelRecord {
            ${objectivePanelRecord}
        }
        
        ... on PortfolioPanelRecord {
            ${portfolioPanelRecord}
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
        
        ... on DividendHistoryTableRecord {
            ${dividendHistoryTableRecord}
        }
        ... on DividendLatestTableRecord {
            ${dividendLatestTableRecord}
        }
        ... on DividendGrowthChartRecord {
            ${dividendGrowthChartRecord}
        }
    }
`;
