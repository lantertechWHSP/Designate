import { IImage } from '~/interfaces/util/image';
import { IStructuredText } from '~/interfaces/util/structuredText';

export interface IPerson {
    id?:string;
    name?:string;
    companyPosition?:string;
    qualifications?:string;
    description?:IStructuredText;
    image:IImage;
}
