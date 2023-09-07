export const documents:string = `
    query documents ($first: IntType, $skip: IntType, $filter: DocumentModelFilter, $orderBy: [DocumentModelOrderBy]) {
        documents: allDocuments(first: $first, skip: $skip, filter: $filter, orderBy: $orderBy) {
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

export const documentFirstLastDates = `
    query documents {
        firstDate: allDocuments(orderBy: date_ASC, first: 1) {
            date
        }
        lastDate: allDocuments(orderBy: date_DESC, first: 1) {
            date
        }
    }
`

export const documentsMeta:string = `
    query documents($filter: DocumentModelFilter) {
        documentsMeta: _allDocumentsMeta(filter: $filter) {
            count
        }
    }
`;

