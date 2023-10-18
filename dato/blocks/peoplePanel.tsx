import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const peoplePanelRecord:string = `
    __typename
    id
    containerWidth
    people {
        id
        name
        definition
        companyPosition
        image {
            ${imageAttrs({ width: 500, height: 500 })}
        }
    }
`;
