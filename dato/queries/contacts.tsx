const contactsFrag:string = `
    fragment contactFrag on ContactRecord {
        __typename
        id
        title
        address
        contactName
        phone
        phone2
        email
        email2
        website
        abn
        ordinal
    }
`;

export const contacts:string = `
    query contacts {
        contacts: allContacts {
            ...contactFrag
        }
    }
    ${contactsFrag}
`;
