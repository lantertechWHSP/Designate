import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import {internalLinkAttrs} from "~/dato/attrs/internalLink";

export const cardPanelRecord:string = `
    __typename
    id
    annotation
    title
    description
    image {
        ${imageAttrs(700, 700)}
    }
    align
    link {
        ${internalLinkAttrs}
    }
    document {
        ... on DocumentRecord {
            id
            document {
                url
            }
        }
    }
    paddingTop
    paddingBottom
`;
