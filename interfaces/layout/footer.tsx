import { IMenuLink } from '~/interfaces/models/menuLink';

export interface IFooter {
    menu?: IMenuLink[];
    email?:string;
    address?:string;
    phone?:string
    fax?:string
    linkedin?:string;
    youtube?:string;
    copyright?:string
}
