import { ISEO } from '~/interfaces/util/seo';

export interface IPage {
    id?:string;
    title?:string;
    slug?:string;
    seo?: ISEO;
    blocks?:any[];
}
