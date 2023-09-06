import { cardRecord } from '~/dato/blocks/card';

export const cardContainerRecord:string = `
    __typename
    id
    title 
    cards {
        ... on CardRecord {
            ${cardRecord}
        }
    }
`;
