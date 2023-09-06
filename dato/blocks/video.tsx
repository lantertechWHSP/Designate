import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const videoRecord:string = `
    __typename
    id
    title
    video {
        url
    }
    videoEmbed {
        url
        thumbnailUrl
    }
    coverImage {
        ${imageAttrs()}
    }
`;
