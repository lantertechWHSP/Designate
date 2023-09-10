import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { internalLinkAttrs } from '~/dato/attrs/internalLink';

export const rectangleCardRecord:string = `
    __typename
    id
    annotation
    title
    description
    link {
        ${internalLinkAttrs}
    }
    image {
        ${imageAttrs({ width: 650, height: 500 })}
    }
`;
