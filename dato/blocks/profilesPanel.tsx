import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const profilesPanelRecord:string = `
    __typename
    id
    people {
        id
        name
        definition
        companyPosition
        description {
            ${structuredTextAttrs}
        }
        qualifications
        image {
            ${imageAttrs({ width: 500, height: 500 })}
        }
    }
`;
