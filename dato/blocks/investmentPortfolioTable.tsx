import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const investmentPortfolioTableRecord:string = `
    __typename
    id
    title
    description {
        ${structuredTextAttrs}
    }
    table
    lastUpdated
    paddingTop
    paddingBottom
`;
