import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';
import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const computershareContactPanelRecord:string = `
    __typename
    id
    title
    image {
        ${imageAttrs()}
    }
    description {
        ${structuredTextAttrs}
    }
    onlineDescription {
        ${structuredTextAttrs}
    }
    website
    contactLocal
    contactInternational
    email
    address {
        ${structuredTextAttrs}
    }
`;
