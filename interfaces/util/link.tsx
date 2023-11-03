import { IFile } from '~/interfaces/util/file';

export interface ILink {
    id?:string;
    __typename?:string;
    title?:string;
    slug:string;
    document?:IFile;
}
