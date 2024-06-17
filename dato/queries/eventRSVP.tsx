export const eventRSVP:string = `
    query eventRsvps ($in:[ItemId]) {
        eventRSVPS: allEventRsvps(filter: {id: {in: $in}}) {
            name
            isShareholder
            email
            attending
        }
    }
`;