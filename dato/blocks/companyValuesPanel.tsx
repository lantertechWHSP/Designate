import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const companyValuesPanelRecord:string = `
    __typename
    id
    items {
        title
        content
        icon {
            ${imageAttrs(30, 30)}
        }
    }
`;
