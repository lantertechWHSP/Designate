import { IMenuLink } from '~/interfaces/models/menuLink';
import { IFooter } from '~/interfaces/layout/footer';

export interface ISite {
    site: ISiteMeta,
    menu: IMenuLink[];
    footer: IFooter;
}

export interface ISiteMeta {
    favicon: {
        attributes:any;
        content:any;
        tags:any;
    }
}
