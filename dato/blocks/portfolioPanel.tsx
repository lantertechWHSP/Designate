import { textRecord } from '~/dato/blocks/text';
import { peoplePanelRecord } from '~/dato/blocks/peoplePanel';
import { personQuotePanelRecord } from '~/dato/blocks/personQuotePanel';
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
            ... on PeoplePanelRecord {
                ${peoplePanelRecord}
            }
            ... on PersonQuotePanelRecord {
                ${personQuotePanelRecord}
            }
            ... on PortfolioImageGalleryRecord {
                ${portfolioImageGalleryRecord}
            }
        }
    }
`;
