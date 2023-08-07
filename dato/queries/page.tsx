import { blocks } from '~/dato/blocks/index';
import { seoAttrs } from '~/dato/attrs/seo';

export const page = `
  query page ($slug: String!) {
    page(filter: {slug: {eq: $slug}}) {
      id
      title
      slug
      seo: _seoMetaTags {
        ${seoAttrs}
      }
      ${blocks}
    }
  }
`;
