import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { internalLinkAttrs } from "~/dato/attrs/internalLink";

export const cardPanelRecord:string = `
    __typename
    id
    annotation
    title
    description
    image {
        ${imageAttrs()}
    }
    align
    link {
        ${internalLinkAttrs}
    }
    paddingTop
    paddingBottom
    containerWidth
    background
`;
