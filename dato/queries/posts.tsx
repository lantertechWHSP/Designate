const postFrag = `
    fragment postFrag on PostRecord {
        __typename
        id
        slug
        title
        image {
            responsiveImage (imgixParams: { auto:format, w: "1380", h: "920", fit:crop }) {
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
        publishDate
        isFeatured
    }
`;

export const latestPosts = `
    query posts($isFeatured: BooleanType, $first: IntType) {
        posts: allPosts(filter: {isFeatured: {eq: $isFeatured}}, first: $first, orderBy: publishDate_DESC) {
            ...postFrag
        }
    }
    ${postFrag}
`;

export const posts = `
    query posts {
        posts: allPosts {
            ...postFrag
        }
    }
    ${postFrag}
`;
