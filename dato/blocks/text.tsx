import { internalLinkAttrs } from "~/dato/attrs/internalLink";
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';

export const textRecord:string = `
    __typename
    id
    content {
        value
        links {
            ${internalLinkAttrs}
        }
        blocks {
            __typename
            ... on ImageRecord {
                ${imageRecord}
            }
            ... on VideoRecord {
                ${videoRecord}
            }
            ... on AudioRecord {
                ${audioRecord}
            }
        }
    }
`;
