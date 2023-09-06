import { IPage } from '~/interfaces/models/page';
import { IMenuLink } from '~/interfaces/models/menuLink';
import { IFooter } from '~/interfaces/layout/footer';

export interface ILayout {
    metatags: any;
    breadcrumbs: any;
    page: IPage;
    menu: IMenuLink[];
    footer: IFooter;
    slug: string;
    isHomePage: boolean;
    title: string;
    preview: boolean;
}
