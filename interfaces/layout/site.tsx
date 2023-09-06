import { IMenuLink } from '~/interfaces/models/menuLink';
import { IFooter } from '~/interfaces/layout/footer';

export interface ISite {
    site: {
        favicon: {
            attributes:any;
            content:any;
            tags:any;
        }
        menu: IMenuLink;
    },
    footer: IFooter;
}

