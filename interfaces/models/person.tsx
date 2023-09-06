import { IImage } from '~/interfaces/util/image';

interface IPerson {
    id?:string;
    name?:string;
    definition?:string;
    companyPosition?:string;
    description?:string;
    image:IImage;
}
