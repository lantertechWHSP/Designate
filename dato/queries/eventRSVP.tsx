export const eventRSVP:string = `
    query eventRsvps ($in:[ItemId], $first: IntType, $skip: IntType) {
        eventRSVPS: allEventRsvps(filter: {id: {in: $in}}, first: $first, skip: $skip, orderBy: _createdAt_ASC) {
            id
            name
            isShareholder
            email
            eventDatesAttending {
                id
            }
        }
    }
`;

export const eventRSVPEventDates:string = `
    query eventRsvps ($id : ItemId) {
        eventRSVPS: allEventRsvps(filter: {id: { eq: $id }}) {
            _allReferencingEvents {
                id
                eventDates {
                    id
                    title
                    label
                    shortLabel
                }
                rsvp {
                    id
                }
            }
        }
    }
`;