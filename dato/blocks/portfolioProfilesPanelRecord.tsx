import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const portfolioProfilesPanelRecord:string = `
    __typename
    id
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
