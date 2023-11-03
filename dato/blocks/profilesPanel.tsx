import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const profilesPanelRecord:string = `
    __typename
    id
    items {
        person {
            id
            name
            companyPosition
            qualifications
            image {
                ${imageAttrs({ width: 424, height: 310 })}
            }
        }
        description {
            ${structuredTextAttrs}
        }
    }
`;
