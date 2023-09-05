import { IMenuItemLink } from '~/interfaces/menuItemLink';

export interface ISite {
    site: {
        favicon: {
            attributes:any;
            content:any;
            tags:any;
        }
        menu: IMenuItemLink;
    },
    footer: IFooter;
}

export interface IFooter {
    email?:string;
    address?:string;
    phone?:string
    fax?:string
    linkedin?:string;
    copyright?:string
}
