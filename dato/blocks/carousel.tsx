import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const carouselRecord:string = `
    __typename
    id
    items {
        image {
            ${imageAttrs()}
        }
    }
    background
    paddingTop
    paddingBottom
    autoSwitch
`;
