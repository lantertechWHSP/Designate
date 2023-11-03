export const internalLinkAttrs:string = `
    ... on PageRecord {
        id
        title
        slug
    }
    ... on PostRecord {
        id
        title
        slug
    }
    ... on DocumentRecord {
        id
        title
        slug
    }
`;
