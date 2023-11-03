export const internalLinkAttrs:string = `
    ... on PageRecord {
        __typename
        id
        title
        slug
    }
    ... on PostRecord {
        __typename
        id
        title
        slug
    }
    ... on DocumentRecord {
        __typename
        id
        document {
            url
        }
    }
`;
