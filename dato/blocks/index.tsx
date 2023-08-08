import { textRecord } from "~/dato/blocks/text";
import { imageRecord } from "~/dato/blocks/image";

export const blocks = `
    blocks {
        ... on TextRecord {
            ${textRecord}
        }
        ... on ImageRecord {
            ${imageRecord}
        }
    }
`;
