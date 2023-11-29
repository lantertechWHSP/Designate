import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const homePageImageGalleryRecord:string = `
    __typename
    imageMain {
        ${imageAttrs({ width: 652, height: 672})}
    }
    imageSide {
        ${imageAttrs({ width: 652, height: 332 })}
    }
    imageSide2 {
        ${imageAttrs({ width: 652, height: 332 })}
    }
    background
    paddingTop
    paddingBottom
`;
