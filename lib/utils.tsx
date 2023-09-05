import { getBlock } from '~/components/ModularContent';

export const resolveInternalLink:any = (link:IDatoLink) : string => {
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
export const treePath:any = (tree, breakCondition) : any => {
    const len:number = tree?.length;
    if (len === 0) return [];
    const result:any[] = [];

    function loop(treeNode) : any {
        result.push(treeNode);
        if (breakCondition && breakCondition(treeNode)) throw 'Found.';
        const childLen:number = treeNode.children?.length;
        for (let j:number = 0; j < childLen; j++) {
            loop(treeNode.children[j]);
        }
        result.pop();
    }

    try {
        for (let i:number = 0; i < len; i++) loop(tree[i]);
    } catch (e) {
        return result;
    }
    return result;
};

export const getBreadcrumbs:any = (menu, page) : any => {
    let breadcrumbs:any[] = [];

    const path:any = treePath(menu, (node) => {
        return node.link?.slug === page?.slug;
    });

    if(path) {
        breadcrumbs = path.map((node) => ({
            title: node?.title ? node?.title : '',
            path: node?.link?.slug ? `/${node?.link?.slug}` : '#',
            isCurrentPage: node?.link?.slug === page?.slug,
            node
        }));
    }

    if (breadcrumbs.length === 0 && page) {
        breadcrumbs = [
            { title: page?.title, path: page?.slug ? page?.slug : null, isCurrentPage: true }
        ];
    }
    return breadcrumbs;
};

export const getLayoutData:any = (site, page, preview) : any => {
    const favicon:any = site?.site?.favicon || [];
    const metatags:any = [...favicon, ...(page?.seo || [])];
    const breadcrumbs:any = getBreadcrumbs(site?.menu, page);

    return {
        metatags: metatags,
        breadcrumbs: breadcrumbs,
        page: page ? page : null,
        menu: site?.menu || [],
        footer: site?.footer || null,
        slug: page?.slug || null,
        isHomePage: page?.slug ? page?.slug === 'home' : false,
        title: page?.title || null,
        preview: preview || false,
    };
};

export const getBlocks:any = async (blocks): Promise<any> => {
    if(blocks) {
        return (
            (await Promise.all(
                blocks?.map(async (block) => {
                    const b:any = getBlock(block.__typename);
                    if (b?.getData instanceof Function) {
                        block.data = await b?.getData(block);
                    }
                    return block;
                })
            )) || []
        );
    }

    return [];
};
