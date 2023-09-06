const eventFrag = `
    fragment eventFrag on EventRecord {
        __typename
        id
        title
        allDay
        startDate
        endDate
        details
        location
    }
`;

export const events = `
    query events ($limit: IntType) {
        events: allEvents(first: $limit, orderBy: startDate_DESC) {
            ...eventFrag
        }
    }
    ${eventFrag}
`;
