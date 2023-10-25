import { internalLinkAttrs } from '~/dato/attrs/internalLink';

export const seeAlsoPanelRecord:string = `
    __typename
    id
    items {
        ... on SeeAlsoItemRecord {
            title
            description
            link {
                ${internalLinkAttrs}
            }
        }
    }
    paddingTop
    paddingBottom
`;
