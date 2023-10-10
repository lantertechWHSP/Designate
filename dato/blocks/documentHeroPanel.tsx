import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const documentHeroPanelRecord:string = `
    __typename
    id
    description
    coverImage {
        ${imageAttrs()}
    }
    document {
        title
        document {
            url
        }
    }
`;
