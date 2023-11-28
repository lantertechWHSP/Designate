import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const posts:string = `
    query posts ($first: IntType, $skip: IntType, $filter: PostModelFilter, $orderBy: [PostModelOrderBy]) {
        posts: allPosts(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
            __typename
            id
            slug
            title
            author {
                name
            }
            coverImage {
                ${imageAttrs({ width: 800, height: 400 })}   
            }
            coverImageCaption
            category
            publishDate
            blocks {
                ... on ImageRecord {
                    __typename
                    id
                    image {
                        ${imageAttrs({ width: 800, height: 400 })}   
                    }
                }
                ... on TextRecord {
                    __typename
                    id
                    content {
                        blocks {
                            ... on ImageRecord {
                                __typename
                                id
                                image {
                                    ${imageAttrs({ width: 800, height: 400 })}   
                                }
                            }
                        }
                    }
                }
            }
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
                    author {
                        name
                    }
                    coverImage {
                        ${imageAttrs({ width: 840, height: 420 })}   
                    }
                    blocks {
                        ... on ImageRecord {
                            __typename
                            id
                            image {
                                ${imageAttrs({ width: 840, height: 420 })}   
                            }
                        }
                        ... on TextRecord {
                            __typename
                            id
                            content {
                                blocks {
                                    ... on ImageRecord {
                                        __typename
                                        id
                                        image {
                                            ${imageAttrs({ width: 840, height: 420 })}   
                                        }
                                    }
                                }
                            }
                        }
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
            author {
                name
            }
            coverImage {
                ${imageAttrs({ width: 840, height: 420 })}   
            }
            blocks {
                ... on ImageRecord {
                    __typename
                    id
                    image {
                        ${imageAttrs({ width: 840, height: 420 })}   
                    }
                }
                ... on TextRecord {
                    __typename
                    id
                    content {
                        blocks {
                            ... on ImageRecord {
                                __typename
                                id
                                image {
                                    ${imageAttrs({ width: 840, height: 420 })}   
                                }
                            }
                        }
                    }
                }
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
                    author {
                        name
                    }
                    coverImage {
                        ${imageAttrs({ width: 1440, height: 550 })}   
                    }
                    blocks {
                        ... on ImageRecord {
                            __typename
                            id
                            image {
                                ${imageAttrs({ width: 1440, height: 550 })}   
                            }
                        }
                        ... on TextRecord {
                            __typename
                            id
                            content {
                                blocks {
                                    ... on ImageRecord {
                                        __typename
                                        id
                                        image {
                                            ${imageAttrs({ width: 1440, height: 550 })}   
                                        }
                                    }
                                }
                            }
                        }
                    }
                    publishDate
                }
            }
        }
    }
`;
