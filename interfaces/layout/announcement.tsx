import { IStructuredText } from '~/interfaces/util/structuredText';

export interface IDatoAnnouncement {
    description?:IStructuredText;
    display?:boolean;
    _publishedAt:string;
}
