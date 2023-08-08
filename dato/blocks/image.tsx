export const imageRecord = `
    __typename
    id
    image {
        responsiveImage (imgixParams: { auto:format, w: "1380", fit:crop }) {
            aspectRatio
            height
            sizes
            src
            srcSet
            webpSrcSet
            width
            alt
            title
        }
    }
`;
