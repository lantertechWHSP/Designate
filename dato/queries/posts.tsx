const postFrag = `
    fragment postFrag on PostRecord {
        __typename
        id
        slug
        title
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
