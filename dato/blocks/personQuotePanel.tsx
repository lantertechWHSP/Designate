import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const personQuotePanelRecord:string = `
    __typename
    id
    person {
        id
        name
        image {
            ${imageAttrs({ width: 500, height: 500 })}
        }
    }
    quote
    containerWidth
`;
