import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const eventRSVPFormPanelRecord:string = `
    __typename
    id
    paddingTop
    paddingBottom
    background
    eventBundle {
        id
        title
        description {
            ${structuredTextAttrs}
        }
        disclaimer {
            ${structuredTextAttrs}
        }
        events {
            id
            label
            startDate
        }
    }
`;
