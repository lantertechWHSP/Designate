export const documents:string = `
    query documents ($first: IntType, $skip: IntType, $filter: DocumentModelFilter, $orderBy: [DocumentModelOrderBy]) {
        documents: allDocuments(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
            __typename
            id
            title
            date
            category {
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
            ordinal
        }
    }
`;

export const documentsMeta:string = `
    query documents($filter: DocumentModelFilter) {
        documentsMeta: _allDocumentsMeta(filter: $filter) {
            count
        }
    }
`;

export const documentsFilters:string = `
    query documents($filter: DocumentModelFilter) {
        firstDate: allDocuments(filter: $filter, orderBy: date_ASC, first: 1) {
            date
        }
        lastDate: allDocuments(filter: $filter, orderBy: date_DESC, first: 1) {
            date
        }
        tags: allDocuments(filter: $filter) {
            tags {
                id
                label
            }
        }
    }
`;
