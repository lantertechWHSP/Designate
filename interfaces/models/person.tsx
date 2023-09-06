import { IDatoImage } from '~/interfaces';

interface IPerson {
    id?:string;
    name?:string;
    definition?:string;
    companyPosition?:string;
    description?:string;
    image:IDatoImage;
}
