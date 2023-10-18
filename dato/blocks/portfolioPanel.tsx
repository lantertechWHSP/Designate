import { textRecord } from '~/dato/blocks/text';
import { portfolioProfilesPanelRecord } from '~/dato/blocks/portfolioProfilesPanelRecord';
import { portfolioQuotePanelRecord } from '~/dato/blocks/portfolioQuotePanel';
import { portfolioImageGalleryRecord } from '~/dato/blocks/portfolioImageGallery';

export const portfolioPanelRecord:string = `
    __typename
    id
    items {
        title
        content {
            ... on TextRecord {
                ${textRecord}
            }
            ... on PortfolioProfilesPanelRecord {
                ${portfolioProfilesPanelRecord}
            }
            ... on PortfolioQuotePanelRecord {
                ${portfolioQuotePanelRecord}
            }
            ... on PortfolioImageGalleryRecord {
                ${portfolioImageGalleryRecord}
            }
        }
    }
`;
