// General
import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';
import { cardContainerRecord } from '~/dato/blocks/cardContainer';
import { rectangleCardRecord } from '~/dato/blocks/rectangleCard';
import { overviewRecord } from '~/dato/blocks/overview';
import { accordionRecord } from '~/dato/blocks/accordion';
import { carouselRecord } from '~/dato/blocks/carousel';

// Home
import { heroRecord } from '~/dato/blocks/hero';
import { homePageOverviewRecord } from '~/dato/blocks/homePageOverview';
import { investorPanelRecord } from '~/dato/blocks/investorPanel';
import { asxAnnouncementsPanelRecord } from '~/dato/blocks/asxAnnouncementsPanel';

// About/Our Company
import { companyValuesPanelRecord } from '~/dato/blocks/companyValuesPanel';

// About/Track Record
import { shareholderReturnsTableRecord } from '~/dato/blocks/shareholderReturnsTable';
import { shareholderReturnsChartRecord } from '~/dato/blocks/shareholderReturnsChart';
import { dividendHistoryRecord } from '~/dato/blocks/dividendHistory';

// About/Investment Approach
import { investmentPhilosophyRecord } from '~/dato/blocks/investmentPhilosophy';
import { investmentPortfolioTableRecord } from '~/dato/blocks/investmentPortfolioTable';

// About/Investment Portfolio
import { peoplePanelRecord } from '~/dato/blocks/peoplePanel';


import { latestNewsRecord } from '~/dato/blocks/latestNews';
import { dividendsPanelRecord } from '~/dato/blocks/dividendsPanel';
import { sharePricePanelRecord } from '~/dato/blocks/sharePricePanel';
import { shareQuoteTableRecord } from '~/dato/blocks/shareQuoteTable';
import { shareHistoricalPricesTableRecord } from '~/dato/blocks/shareHistoricalPricesTable';
import { contactsPanelRecord } from '~/dato/blocks/contactsPanel';


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
        ... on CardContainerRecord {
            ${cardContainerRecord}
        }
        ... on RectangleCardRecord {
            ${rectangleCardRecord}
        }
        ... on OverviewRecord {
            ${overviewRecord}
        }
        ... on AccordionRecord {
            ${accordionRecord}
        }
        ... on CarouselRecord {
            ${carouselRecord}
        }

        ... on HeroRecord {
            ${heroRecord}
        }
        ... on HomePageOverviewRecord {
            ${homePageOverviewRecord}
        }
        ... on InvestorPanelRecord {
            ${investorPanelRecord}
        }
        ... on AsxAnnouncementsPanelRecord {
            ${asxAnnouncementsPanelRecord}
        }
        
        ... on CompanyValuesPanelRecord {
            ${companyValuesPanelRecord}
        }

        ... on ShareholderReturnsTableRecord {
            ${shareholderReturnsTableRecord}
        }
        ... on ShareholderReturnsChartRecord {
            ${shareholderReturnsChartRecord}
        }
        ... on DividendHistoryRecord {
            ${dividendHistoryRecord}
        }
        
        ... on InvestmentPhilosophyRecord {
            ${investmentPhilosophyRecord}
        }
        ... on InvestmentPortfolioTableRecord {
            ${investmentPortfolioTableRecord}
        }
        
        
        ... on PeoplePanelRecord {
            ${peoplePanelRecord}
        }
       
        
        
        
        ... on DividendsPanelRecord {
            ${dividendsPanelRecord}
        }
        ... on LatestNewsRecord {
            ${latestNewsRecord}
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
        ... on ContactsPanelRecord {
            ${contactsPanelRecord}
        }
    }
`;
