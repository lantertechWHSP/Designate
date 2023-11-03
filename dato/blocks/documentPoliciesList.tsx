export const documentPoliciesListRecord:string = `
    __typename
    id
    title
    items {
        title
        documents {
            title
            document {
                url
            }
        }
    }
`;
