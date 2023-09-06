export const documents:string = `
    query documents ($limit: IntType, $skip: IntType, $orderBy: [DocumentModelOrderBy]) {
        documents: allDocuments(first: $limit, skip: $skip, orderBy: $orderBy) {
            __typename
            id
            title
            date
            categories {
                id
                label
            }
            tags {
                id
                label
            }
            document {
                id
                title
                url
            }
        }
    }
`;

export const documentsMeta:string = `
    query documents {
        documentsMeta: _allDocumentsMeta {
            count
        }
    }
`;

