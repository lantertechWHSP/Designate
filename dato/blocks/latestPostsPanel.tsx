import { imageAttrs } from '~/dato/attrs/responsiveImageAttrs';

export const latestPostsPanelRecord:string = `
    __typename
    id
    background
    textColor
    paddingTop
    paddingBottom
    pinnedPosts {
        ... on PostRecord {
            __typename
            id
            slug
            title
            author {
                name
            }
            image {
                ${imageAttrs({ width: 840, height: 420 })}   
            }
            publishDate
        }
    }
`;
