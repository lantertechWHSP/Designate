import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const overviewRecord:string = `
    __typename
    id
    subtitle {
        ${structuredTextAttrs}
    }
    description {
        ${structuredTextAttrs}
    }
    paddingTop
    paddingBottom
`;
