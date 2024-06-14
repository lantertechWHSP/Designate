import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const homePageAnnouncementPanelRecord:string = `
    __typename
    id
    description {
        ${structuredTextAttrs} 
    }
`;
