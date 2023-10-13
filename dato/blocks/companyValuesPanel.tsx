import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const companyValuesPanelRecord:string = `
    __typename
    id
    items {
        title
        icon {
            ${imageAttrs(100, 100)}
        }
    }
    containerWidth  
`;
