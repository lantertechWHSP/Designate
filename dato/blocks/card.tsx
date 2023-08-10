import { internalLinkAttrs } from "~/dato/attrs/internalLink";

export const cardRecord = `
    __typename
    id
    link {
        ${internalLinkAttrs}
    }
`;
