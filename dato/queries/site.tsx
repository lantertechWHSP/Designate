import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

const menuItemFrag:string = `
    fragment menuItemFrag on MenuItemRecord {
        id
        title
        link {
            ... on PageRecord {
                __typename
                id
                title
                slug
            }
        }
        externalLink
    }
`;

export const site:string = `
    query site {
        site: _site {
            favicon: faviconMetaTags {
                attributes
                content
                tag
            }
        }
        menu: allMenuItems(
            filter: { parent: { exists: "*" } }
            orderBy: position_ASC
        ) {
            ...menuItemFrag
            children {
                ...menuItemFrag
                children {
                    ...menuItemFrag
                }
            }
        }
        footer {
            id
            email
            address {
                ${structuredTextAttrs}
            }
            phone
            fax
            linkedin
            youtube
            abn
            copyright
            privacyPolicyDocument {
                document {
                    id
                    title
                    url
                }
            }
        }
    },
    ${menuItemFrag}
`;
