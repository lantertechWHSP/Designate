export const pages:string = `
    query pages {
        pages: allPages(first: 100) {
            id
            title
            slug
        }
    }
`;
