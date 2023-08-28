import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const people = `
    query people {
        people: allPeople {
            id
            name
            image {
                ${imageAttrs()}
            }
        }
    }
`;
