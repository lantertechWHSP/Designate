const menuItemFrag = `
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

export const site = `
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
            address
            phone
            fax
            linkedin
            copyright
        }
    },
    ${menuItemFrag}
`;
