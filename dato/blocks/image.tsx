import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const imageRecord:string = `
    __typename
    id
    image {
        ${imageAttrs()}
    }
    title
    containerWidth
    paddingTop
    paddingBottom
    background
    imageWidth
`;
