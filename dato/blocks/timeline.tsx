import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const timelineRecord:string = `
    __typename
    id
    title
    description {
        ${structuredTextAttrs}
    }
    itemsTitle
    items {
        date
        description {
            ${structuredTextAttrs}
        }
    }
    paddingTop
    paddingBottom
`;