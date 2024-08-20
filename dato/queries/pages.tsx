export const pages:string = `
    query pages($first: IntType, $skip: IntType) {
        pages: allPages(first: $first, skip: $skip) {
            id
            title
            slug
        }
    }
`;
