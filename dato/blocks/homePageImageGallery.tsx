import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const homePageImageGalleryRecord:string = `
    __typename
    imageMain {
        ${imageAttrs({ width: 652, height: 672})}
    }
    imageSide {
        ${imageAttrs({ width: 652, height: 330})}
    }
    imageSide2 {
        ${imageAttrs({ width: 652, height: 330})}
    }
`;
