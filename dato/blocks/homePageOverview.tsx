import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const homePageOverviewRecord:string = `
    __typename
    id
    description
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
