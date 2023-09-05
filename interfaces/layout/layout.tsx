import { IPage } from '~/interfaces';
import { IMenuItemLink } from '~/interfaces/menuItemLink';
import { IFooter } from '~/interfaces/site/site';

export interface ILayout {
    metatags: any;
    breadcrumbs: any;
    page: IPage;
    menu: IMenuItemLink[];
    footer: IFooter;
    slug: string;
    isHomePage: boolean;
    title: string;
    preview: boolean;
};
