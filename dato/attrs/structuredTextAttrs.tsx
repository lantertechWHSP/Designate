import { internalLinkAttrs } from "~/dato/attrs/internalLink";

export const structuredTextAttrs:string = `
    value
    links {
        ${internalLinkAttrs}
    }
`;
