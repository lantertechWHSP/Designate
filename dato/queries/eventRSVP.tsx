export const eventRSVP:string = `
    query eventRsvps ($in:[ItemId], $first: IntType, $skip: IntType) {
        eventRSVPS: allEventRsvps(filter: {id: {in: $in}}, first: $first, skip: $skip, orderBy: _createdAt_ASC) {
            id
            name
            isShareholder
            email
            eventsAttending {
                id
            }
        }
    }
`;

export const eventRSVPEventDates:string = `
    query eventRsvps ($id : ItemId) {
        eventRSVPS: allEventRsvps(filter: {id: { eq: $id }}) {
            _allReferencingEventBundles {
                id
                events {
                    id
                    title
                    label
                }
                rsvp {
                    id
                }
            }
        }
    }
`;