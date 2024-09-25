export const events:string = `
    query events ($in:[ItemId]) {
        events: allEvents(filter: {id: {in: $in}}, orderBy: startDate_DESC) {
            id
            title
            label
            allDay
            startDate
            endDate
            location
            isRsvp
            rsvpCutOffDate
        }
    }
`;

export const latestEvents:string = `
    query events ($in:[ItemId], $first: IntType) {
        events: allEvents(filter: {id: {in: $in}}, first: $first, orderBy: startDate_DESC) {
            id
            title
            label
            allDay
            startDate
            endDate
            location
            isRsvp
            rsvpCutOffDate
        }
    }
`;