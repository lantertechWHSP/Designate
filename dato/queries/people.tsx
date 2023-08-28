import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const people = `
    query people($definition: String!) {
        people: allPeople(filter: {definition: {eq: $definition}}) {
            id
            name
            definition
            companyPosition
            description
            image {
                ${imageAttrs({ width: 500, height: 500 })}
            }
        }
    }
`;
