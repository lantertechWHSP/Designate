export const eventDates:string = `
    query eventDates ($in:[ItemId]) {
        eventDates: allEventDates(filter: {id: {in: $in}}, orderBy: startDate_DESC) {
            id
            title
            label
            allDay
            startDate
            endDate
            location
        }
    }
`;