import { blocks } from '~/dato/blocks/index';
import { seoAttrs } from '~/dato/attrs/seo';

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
            ${blocks}
        }
    }
`;
