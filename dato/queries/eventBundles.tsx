export const eventBundle:string = `
    query eventBundles($id : ItemId) {
        eventBundles: allEventBundles(filter: {id: { eq: $id }}) {
            id
            events {
                id
                title
                label
            }
        }
    }
`;

