import { internalLinkAttrs } from "~/dato/attrs/internalLink";

export const cardRecord:string = `
    __typename
    id
    link {
        ${internalLinkAttrs}
    }
`;
