const eventFrag:string = `
    fragment eventFrag on EventRecord {
        __typename
        id
        title
        eventDates {
            startDate
            endDate
            location
            allDay
        }
    }
`;

export const events:string = `
    query events ($limit: IntType) {
        events: allEvents(first: $limit) {
            ...eventFrag
        }
    }
    ${eventFrag}
`;
