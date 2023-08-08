import { internalLinkAttrs } from "~/dato/attrs/internalLink";

export const textRecord = `
    __typename
    id
    content {
        value
        links {
            ${internalLinkAttrs}
        }
    }
`;
