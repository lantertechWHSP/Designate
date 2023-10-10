import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const peoplePanel:string = `
    __typename
    id
    people {
        id
        name
        definition
        companyPosition
        description
        image {
            ${imageAttrs({ width: 500, height: 500 })}
        }
    }
`;
