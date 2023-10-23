import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const portfolioImageGalleryRecord:string = `
    __typename
    id
    images {
        ${imageAttrs()}
    }
    paddingTop
    paddingBottom
`;
