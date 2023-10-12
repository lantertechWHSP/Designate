import { blocks } from '~/dato/blocks/index';
import { seoAttrs } from '~/dato/attrs/seo';

export const page:string = `
    query page ($slug: String!) {
        page(filter: {slug: {eq: $slug}}) {
            id
            title
            slug
            seo: _seoMetaTags {
                ${seoAttrs}
            }
            darkTheme
            ${blocks}
        }
    }
`;
