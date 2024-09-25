import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';
import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const communityInvestmentPanelRecord:string = `
    __typename
    id
    title
    description {
        ${structuredTextAttrs}
    }
    items {
        description {
                ${structuredTextAttrs}
        }
        image {
            ${imageAttrs()}
        }
    }
    paddingTop
    paddingBottom
`;
