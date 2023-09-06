import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const imageRecord:string = `
    __typename
    id
    image {
        ${imageAttrs({ width: 800, height: 800})}
    }
`;
