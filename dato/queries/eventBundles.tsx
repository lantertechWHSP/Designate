const eventBundleFrag:string = `
    fragment eventBundleFrag on EventRecord {
        __typename
        id
        title
        events {
            startDate
            endDate
            location
            allDay
        }
    }
`;

export const eventBundles:string = `
    query eventBundles ($limit: IntType) {
        eventBundles: allEvents(first: $limit) {
            ...eventBundleFrag
        }
    }
    ${eventBundleFrag}
`;
