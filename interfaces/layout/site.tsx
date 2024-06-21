import { IMenuLink } from '~/interfaces/models/menuLink';
import { IFooter } from '~/interfaces/layout/footer';
import { IDatoAnnouncement } from '~/interfaces/layout/announcement';

export interface ISite {
    site: ISiteMeta,
    menu: IMenuLink[];
    announcement: IDatoAnnouncement;
    footer: IFooter;
}

export interface ISiteMeta {
    favicon: {
        attributes:any;
        content:any;
        tags:any;
    }
}
