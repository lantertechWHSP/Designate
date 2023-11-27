import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';
import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const posts:string = `
    query posts ($first: IntType, $skip: IntType, $filter: PostModelFilter, $orderBy: [PostModelOrderBy]) {
        posts: allPosts(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
            __typename
            id
            slug
            title
            summary {
                ${structuredTextAttrs}
            }
            author {
                name
            }
            image {
                ${imageAttrs({ width: 800, height: 400 })}   
            }
            imageCaption
            publishDate
        }
    }
`;

export const postsMeta:string = `
    query posts($filter: PostModelFilter) {
        postsMeta: _allPostsMeta(filter: $filter) {
            count
        }
    }
`;

export const featuredLatestPosts:string = `
    query featuredPosts {
        featuredPostsList {
            posts {
                ... on PostRecord {
                    __typename
                    id
                    slug
                    title
                    summary {
                        ${structuredTextAttrs}
                    }
                    author {
                        name
                    }
                    image {
                        ${imageAttrs({ width: 840, height: 420 })}   
                    }
                    publishDate
                }
            }
        }
    }
`;

export const latestPosts:string = `
    query posts ($first: IntType, $skip: IntType, $filter: PostModelFilter, $orderBy: [PostModelOrderBy]) {
        posts: allPosts(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
            __typename
            id
            slug
            title
            summary {
                ${structuredTextAttrs}
            }
            author {
                name
            }
            image {
                ${imageAttrs({ width: 840, height: 420 })}   
            }
            publishDate
        }
    }
`;

export const featuredPosts:string = `
    query featuredPosts {
        featuredPostsList {
            posts {
                ... on PostRecord {
                    __typename
                    id
                    slug
                    title
                    summary {
                        ${structuredTextAttrs}
                    }
                    author {
                        name
                    }
                    image {
                        ${imageAttrs({ width: 1440, height: 550 })}   
                    }
                    publishDate
                }
            }
        }
    }
`;
