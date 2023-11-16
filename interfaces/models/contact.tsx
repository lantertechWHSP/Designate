import { IStructuredText } from '~/interfaces/util/structuredText';

export interface IContact {
    title?:string;
    address?:IStructuredText;
    contactName?:string;
    phone?:string;
    phone2?:string;
    email?:string;
    email2?:string;
    website?:string;
    abn?:string;
    ordinal?:number;
}
