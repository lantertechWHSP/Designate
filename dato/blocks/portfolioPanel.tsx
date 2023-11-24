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
            image {
                ${imageAttrs({ width: 700, height: 700 })}
            }
        }
        companies {
            image {
                ${imageAttrs()}
            }
            url
        }
    }
    paddingTop
    paddingBottom
`;
