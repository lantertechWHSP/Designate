// General
import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';
import { overviewRecord } from '~/dato/blocks/overview';
import { cardPanelRecord } from '~/dato/blocks/cardPanel';
import { accordionRecord } from '~/dato/blocks/accordion';
import { carouselRecord } from '~/dato/blocks/carousel';
import { horizontalRuleRecord } from '~/dato/blocks/horizontalRule';
import { attributesListPanelRecord } from '~/dato/blocks/attributesListPanel';

import { documentHeroPanelRecord } from '~/dato/blocks/documentHeroPanel';
import { companyValuesPanelRecord } from '~/dato/blocks/companyValuesPanel';
import { latestPostsPanelRecord } from '~/dato/blocks/latestPostsPanel';
import { contactsPanelRecord } from '~/dato/blocks/contactsPanel';
import { investorPanelRecord } from '~/dato/blocks/investorPanel';
import { eventListPanelRecord } from '~/dato/blocks/eventListPanel';

// Home
import { heroRecord } from '~/dato/blocks/hero';
import { homePageAnnouncementPanelRecord } from '~/dato/blocks/homePageAnnouncementPanel';
import { homePageImageGalleryRecord } from "~/dato/blocks/homePageImageGallery";
import { asxAnnouncementsPanelRecord } from '~/dato/blocks/asxAnnouncementsPanel';
import { seeAlsoPanelRecord } from '~/dato/blocks/seeAlsoPanel';

// About/Track Record
import { trackRecordTableRecord } from '~/dato/blocks/trackRecordTable';
import { trackRecordChartRecord } from '~/dato/blocks/trackRecordChart';
import { trackRecordDividendRecord } from '~/dato/blocks/trackRecordDividend';

// About/Investment Approach
import { investmentPortfolioTableRecord } from '~/dato/blocks/investmentPortfolioTable';
import { objectivePanelRecord } from '~/dato/blocks/objectivePanel';

// About/Investment Portfolio
import { portfolioPanelRecord } from "~/dato/blocks/portfolioPanel";

// About/Sustainability
import { sustainabilityPanelRecord } from '~/dato/blocks/sustainabilityPanel';

// Investor Center/ ASX Announcements
import { asxNewsletterFormPanelRecord } from '~/dato/blocks/asxNewsletterFormPanel';

// Investor Center/Share Price
import { sharePricePanelRecord } from '~/dato/blocks/sharePricePanel';
import { shareQuoteTableRecord } from '~/dato/blocks/shareQuoteTable';
import { shareHistoricalPricesTableRecord } from '~/dato/blocks/shareHistoricalPricesTable';

// Investor Center/Key Dates
import { eventRSVPFormPanelRecord} from '~/dato/blocks/eventRSVPFormPanel';

// Investor Center/Dividends
import { dividendHistoryTableRecord } from '~/dato/blocks/dividendHistoryTable';
import { dividendLatestTableRecord } from '~/dato/blocks/dividendLatestTable';
import { dividendGrowthChartRecord } from '~/dato/blocks/dividendGrowthChart';

// Investor Center/Manage Shareholdings
import { computershareContactPanelRecord } from "~/dato/blocks/computershareContactPanel";

// Investor Center/ FAQ’s
import { faqsPanelRecord } from '~/dato/blocks/faqsPanel';

// People and Governance
import { profilesPanelRecord } from '~/dato/blocks/profilesPanel';
import { documentPoliciesListRecord } from '~/dato/blocks/documentPoliciesList';

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
        ... on HorizontalRuleRecord {
            ${horizontalRuleRecord}
        }
        ... on AttributesListPanelRecord {
            ${attributesListPanelRecord}
        }

        ... on DocumentHeroPanelRecord {
            ${documentHeroPanelRecord}
        }
        ... on CompanyValuesPanelRecord {
            ${companyValuesPanelRecord}
        }
        ... on LatestPostsPanelRecord {
            ${latestPostsPanelRecord}
        }
        ... on ContactsPanelRecord {
            ${contactsPanelRecord}
        }
        ... on InvestorPanelRecord {
            ${investorPanelRecord}
        }
        ... on EventListPanelRecord {
            ${eventListPanelRecord}
        }

        ... on HeroRecord {
            ${heroRecord}
        }
        ... on HomePageAnnouncementPanelRecord {
            ${homePageAnnouncementPanelRecord}
        }
        ... on HomePageImageGalleryRecord {
            ${homePageImageGalleryRecord}
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

        ... on InvestmentPortfolioTableRecord {
            ${investmentPortfolioTableRecord}
        }
        ... on ObjectivePanelRecord {
            ${objectivePanelRecord}
        }
        
        ... on PortfolioPanelRecord {
            ${portfolioPanelRecord}
        }

        ... on SustainabilityPanelRecord {
            ${sustainabilityPanelRecord}
        }
        
        ... on AsxNewsletterFormPanelRecord {
            ${asxNewsletterFormPanelRecord}
        }

        ... on ProfilesPanelRecord {
            ${profilesPanelRecord}
        }

        ... on DocumentPoliciesListRecord {
            ${documentPoliciesListRecord}
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
        
        ... on EventRsvpFormPanelRecord {
            ${eventRSVPFormPanelRecord}
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

        ... on ComputershareContactPanelRecord {
            ${computershareContactPanelRecord}
        }

        ... on FaqsPanelRecord {
            ${faqsPanelRecord}
        }
    }
`;
