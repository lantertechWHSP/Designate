import { IMenuLink } from '~/interfaces/models/menuLink';
import { IDocument } from '~/interfaces/models/document';

export interface IFooter {
    menu?: IMenuLink[];
    email?:string;
    address?:string;
    phone?:string
    fax?:string
    linkedin?:string;
    youtube?:string;
    abn?:string;
    copyright?:string
    privacyPolicyDocument?:IDocument;
}
