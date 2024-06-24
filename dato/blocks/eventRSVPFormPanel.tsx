import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const eventRSVPFormPanelRecord:string = `
    __typename
    id
    paddingTop
    paddingBottom
    background
    event {
        id
        title
        description {
            ${structuredTextAttrs}
        }
        disclaimer {
            ${structuredTextAttrs}
        }
        eventDates {
            id
            label
            startDate
        }
    }
`;
