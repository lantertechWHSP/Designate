import { imageAttrs } from "~/dato/attrs/responsiveImageAttrs";


const postFrag:string = `
    fragment postFrag on PostRecord {
        __typename
        id
        slug
        title
        excerpt
        author
        image {
            ${imageAttrs({ width: 800, height: 400 })}   
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

export const latestPosts:string = `
    query posts ($first: IntType, $skip: IntType, $filter: PostModelFilter, $orderBy: [PostModelOrderBy]) {
        posts: allPosts(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
            ...postFrag
        }
    }
    fragment postFrag on PostRecord {
        __typename
        id
        slug
        title
        excerpt
        author
        image {
            ${imageAttrs({ width: 840, height: 360 })}   
        }
        publishDate
        isFeatured
    }
`;
