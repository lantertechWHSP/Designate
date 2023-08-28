import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const people = `
    query people {
        people: allPeople {
            id
            name
            image {
                ${imageAttrs({ width: 500, height: 500 })}
            }
            companyPosition
            description
        }
    }
`;
