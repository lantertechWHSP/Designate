import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

const contactsFrag:string = `
    fragment contactFrag on ContactRecord {
        __typename
        id
        title
        address {
            ${structuredTextAttrs} 
        }
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
