import { seoAttrs } from '~/dato/attrs/seo';
import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';

export const post = `
    query post ($slug: String!) {
        post(filter: {slug: {eq: $slug}}) {
            id
            title
            isFeatured
            slug
            seo: _seoMetaTags {
                ${seoAttrs}
            }
            blocks {
                ... on TextRecord {
                    ${textRecord}
                }
                ... on ImageRecord {
                    ${imageRecord}
                }
                ... on VideoRecord {
                    ${videoRecord}
                }
            }
        }
    }
`;
