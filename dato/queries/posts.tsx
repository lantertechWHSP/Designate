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
            publishDate
            isFeatured
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
            isFeatured
        }
    }
`;

export const featuredPosts:string = `
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
                ${imageAttrs({ width: 1440, height: 550 })}   
            }
            publishDate
            isFeatured
        }
    }
`;
