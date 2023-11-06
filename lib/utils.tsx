import { getBlock } from '~/components/ModularContent';
import { ILink } from '~/interfaces/util/link';
import { IBlock } from '~/interfaces/util/block';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { isNil as _isNil } from 'lodash';
import { IFooter } from '~/interfaces/layout/footer';

export const resolveInternalLink:any = (link:ILink) : string => {
    if (!link) {
        return null;
    }

    const { document, slug, __typename } = link;
    switch (__typename) {
        case 'PostRecord':return `/news/${slug}`;
        case 'DocumentRecord': return document.url;
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

export const getLayoutData:any = (site:ISite, page:IPage, preview:boolean) : any => {
    const favicon:any = site?.site?.favicon || [];
    const metatags:any = [...favicon, ...(page?.seo || [])];
    const breadcrumbs:any = getBreadcrumbs(site?.menu, page);

    const footer:IFooter = site?.footer || null;
    if(footer) {
        footer.menu = site?.menu || [];
    }

    return {
        metatags: metatags,
        breadcrumbs: breadcrumbs,
        page: page ? page : null,
        menu: site?.menu || [],
        footer: footer,
        slug: page?.slug || null,
        isHomePage: page?.slug ? page?.slug === 'home' : false,
        title: page?.title || null,
        preview: preview || false,
        darkTheme: !_isNil(page?.darkTheme) ? page.darkTheme : false
    };
};

export const getBlocks:any = async (blocks:IBlock[]): Promise<any> => {
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
