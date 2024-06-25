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
            showRsvpLink
        }
    }
`;