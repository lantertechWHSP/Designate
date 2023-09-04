import { getBlock } from '~/components/ModularContent';

export const resolveInternalLink = (link) : string => {
    if (!link) {
        return null;
    }

    const { slug, __typename } = link;

    switch (__typename) {
        case 'PostRecord':
            return `/news/${slug}`;
    }

    return `/${slug}`;
};

// https://github.com/ifakejs/tree-path
export const treePath = (tree, breakCondition) : any => {
    const len = tree?.length;
    if (len === 0) return [];
    const result = [];

    function loop(treeNode) : any {
        result.push(treeNode);
        if (breakCondition && breakCondition(treeNode)) throw 'Found.';
        const childLen = treeNode.children?.length;
        for (let j = 0; j < childLen; j++) {
            loop(treeNode.children[j]);
        }
        result.pop();
    }

    try {
        for (let i = 0; i < len; i++) loop(tree[i]);
    } catch (e) {
        return result;
    }
    return result;
};

export const getBreadcrumbs = (menu, page) : any => {
    const path = treePath(menu, (node) => {
        return node.link?.slug === page?.slug;
    });
    let breadcrumbs:any = path.map((node) => ({
        title: 'carl', // node?.title ? node?.title : '',
        path: node?.link?.slug ? `/${node?.link?.slug}` : '#',
        isCurrentPage: node?.link?.slug === page?.slug,
        node
    }));
    if (!breadcrumbs?.length) {
        breadcrumbs = [
            { title: '', path: '#', isCurrentPage: true }
            // { title: page?.title, path: page?.slug ? page?.slug : null, isCurrentPage: true }
        ];
    }
    return breadcrumbs;
};

export const getLayoutData = (site, page, preview) : any => {
    const favicon = site?.site?.favicon || [];
    const metatags = [...favicon, ...(page?.seo || [])];
    const breadcrumbs = getBreadcrumbs(site?.menu, page);

    return {
        metatags: metatags,
        breadcrumbs: breadcrumbs,
        page: page,
        menu: site?.menu || [],
        footer: site?.footer || null,
        slug: page?.slug || null,
        isHomePage: page?.slug ? page?.slug === 'home' : false,
        title: page?.title || null,
        preview: preview || false,
    };
};

// export const getBlocks = async ({ blocks = [] }) : Promise<any> => {
//     console.log('0');
//
//     return ((Array.isArray(blocks) && Array.length > 0) ? (
//         (await Promise.all(
//             blocks?.map(async (block) => {
//                 console.log('1');
//                 console.log(block);
//
//                 const b = getBlock(block.__typename);
//                 if (b?.getData instanceof Function) {
//                     console.log('2');
//                     console.log(block);
//                     block.data = await b?.getData(block);
//                 }
//                 return block;
//             })
//         )) || []
//     ) : []
//     );
// };

export const getBlocks = async ({ blocks }): Promise<any> => {
    return (
        (await Promise.all(
            blocks?.map(async (block) => {
                const b = getBlock(block.__typename);
                if (b?.getData instanceof Function) {
                    block.data = await b?.getData(block);
                }
                return block;
            })
        )) || []
    );
};
