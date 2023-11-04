import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const accordionRecord:string = `
    __typename
    id
    title
    items {
        title
        content {
            ${structuredTextAttrs}
        }
    }
    background
    textColor
`;
