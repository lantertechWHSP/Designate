const eventFrag:string = `
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

export const events:string = `
    query events ($limit: IntType) {
        events: allEvents(first: $limit, orderBy: startDate_ASC) {
            ...eventFrag
        }
    }
    ${eventFrag}
`;
