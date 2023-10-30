import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const imageRecord:string = `
    __typename
    id
    image {
        ${imageAttrs()}
    }
    containerWidth
    paddingTop
    paddingBottom
`;
