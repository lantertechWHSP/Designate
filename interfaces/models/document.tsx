import { IFile } from '~/interfaces/util/file';

interface IDocumentCategory {
    id?:string;
    label?:string;
}

interface IDocumentTags {
    id?:string;
    label?:string;
}

export interface IDocument {
    title?:string;
    date?:string;
    categories?:IDocumentCategory[];
    tags?:IDocumentTags[];
    document?:IFile;
}
