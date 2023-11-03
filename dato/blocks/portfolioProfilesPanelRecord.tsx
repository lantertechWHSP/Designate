import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const portfolioProfilesPanelRecord:string = `
    __typename
    id
    people {
        id
        name
        image {
            ${imageAttrs({ width: 500, height: 500 })}
        }
    }
    paddingTop
    paddingBottom
`;
