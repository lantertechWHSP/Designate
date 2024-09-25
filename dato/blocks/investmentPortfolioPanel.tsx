import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const investmentPortfolioPanelRecord:string = `
    __typename
    id
    title
    description {
        ${structuredTextAttrs}
    }
    items {
        title
        description {
                ${structuredTextAttrs}
        }
        icon
    }
    paddingTop
    paddingBottom
`;
