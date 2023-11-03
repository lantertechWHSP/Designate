import { IImage } from '~/interfaces/util/image';

export interface IPerson {
    id?:string;
    name?:string;
    companyPosition?:string;
    qualifications?:string;
    image?:IImage;
}
