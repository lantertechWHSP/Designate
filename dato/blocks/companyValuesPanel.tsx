import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const companyValuesPanelRecord:string = `
    __typename
    id
    title
    items {
        title
        description {
            ${structuredTextAttrs}
        }
        background
        icon
    }
    containerWidth
    background
    paddingTop
    paddingBottom
`;
