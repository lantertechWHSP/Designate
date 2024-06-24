export const eventDates:string = `
    query eventDates ($in:[ItemId]) {
        eventDates: allEventDates(filter: {id: {in: $in}}, orderBy: startDate_ASC) {
            id
            label
        }
    }
`;