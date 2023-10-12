import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const homePageOverviewRecord:string = `
    __typename
    id
    description
    imageMain {
        ${imageAttrs({ width: 700, height: 700})}
    }
    imageSide {
        ${imageAttrs({ width: 700, height: (700 / 2)})}
    }
    imageSide2 {
        ${imageAttrs({ width: 700, height: (700 / 2)})}
    }
`;
