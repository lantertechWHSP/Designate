import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const imageRecord = `
    __typename
    id
    image {
        ${imageAttrs}
    }
`;
