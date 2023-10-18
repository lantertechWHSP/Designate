import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';
import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const textRecord:string = `
    __typename
    id
    content {
        ${structuredTextAttrs}
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
    containerWidth
`;
