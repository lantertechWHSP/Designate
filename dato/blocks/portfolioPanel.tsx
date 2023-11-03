import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';
import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const portfolioPanelRecord:string = `
    __typename
    id
    items {
        title
        content {
            ${structuredTextAttrs}
        }
        people {
            id
            name
            companyPosition
        }
        companies {
            image {
                ${imageAttrs()}
            }
            url
        }
    }
`;
