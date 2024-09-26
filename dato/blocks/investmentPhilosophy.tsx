import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const investmentPhilosophy:string = `
    __typename
    id
    title
    items {
        title
        content {
            ${structuredTextAttrs}
        }
        icon
        background
    }
    background
    paddingTop
    paddingBottom
`;
