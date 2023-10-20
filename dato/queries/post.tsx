import { seoAttrs } from '~/dato/attrs/seo';
import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import {imageAttrs} from "~/dato/attrs/responsiveImageAttrs";

export const post:string = `
    query post ($slug: String!) {
        post(filter: {slug: {eq: $slug}}) {
            id
            slug
            title
            excerpt
            author
            image {
                ${imageAttrs({ width: 1108, height: 550})}
            }
            publishDate
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
