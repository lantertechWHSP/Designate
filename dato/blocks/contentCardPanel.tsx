import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const contentCardPanelRecord:string = `
    __typename
    id
    title
    description {
        ${structuredTextAttrs}
    }
    image {
        ${imageAttrs(700, 700)}
    }
    containerWidth
    paddingTop
    paddingBottom
`;
