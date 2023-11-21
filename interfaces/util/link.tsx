import { IImage } from '~/interfaces/util/image';
import { IFile } from '~/interfaces/util/file';

export interface ILink {
    id?:string;
    __typename?:string;
    title?:string;
    slug:string;

    // Document
    document?:IFile;
    coverImage?:IImage;
}
