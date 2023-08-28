import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const imageRecord = `
    __typename
    id
    image {
        ${imageAttrs({ width: 800, height: 800})}
    }
`;
