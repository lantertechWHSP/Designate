export const eventRSVP:string = `
    query eventRsvps ($in:[ItemId], $first: IntType, $skip: IntType) {
        eventRSVPS: allEventRsvps(filter: {id: {in: $in}}, first: $first, skip: $skip, orderBy: _createdAt_ASC) {
            name
            isShareholder
            email
            details
        }
    }
`;