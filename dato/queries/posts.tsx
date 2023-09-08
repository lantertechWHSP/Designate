const postFrag:string = `
    fragment postFrag on PostRecord {
        __typename
        id
        slug
        title
        image {
            responsiveImage {
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

export const posts:string = `
    query posts ($first: IntType, $skip: IntType, $filter: PostModelFilter, $orderBy: [PostModelOrderBy]) {
        posts: allPosts(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
            ...postFrag
        }
    }
    ${postFrag}
`;

export const postsMeta:string = `
    query posts($filter: PostModelFilter) {
        postsMeta: _allPostsMeta(filter: $filter) {
            count
        }
    }
`;
