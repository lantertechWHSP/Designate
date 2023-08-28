import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const videoRecord = `
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
