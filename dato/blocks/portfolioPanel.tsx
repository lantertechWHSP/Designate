import { textRecord } from '~/dato/blocks/text';
import { peoplePanelRecord } from '~/dato/blocks/peoplePanel';
import { personQuotePanelRecord } from '~/dato/blocks/personQuotePanel';

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
        }
    }
`;
