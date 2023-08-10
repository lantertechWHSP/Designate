import { cardRecord } from '~/dato/blocks/card';

export const cardContainerRecord = `
    __typename
    id
    title 
    cards {
        ... on CardRecord {
            ${cardRecord}
        }
    }
`;
