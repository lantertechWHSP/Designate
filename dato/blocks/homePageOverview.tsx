import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const homePageOverviewRecord:string = `
    __typename
    id
    description {
        ${structuredTextAttrs}
    }
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
