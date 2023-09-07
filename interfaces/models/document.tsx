import { IFile } from '~/interfaces/util/file';
import { IFilter } from '~/interfaces/util/filter';

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

export interface IDocumentsMeta {
    count?:number;
}

export interface IDocumentsFilters {
    yearFilters:IFilter[];
    tagFilters:IFilter[];
}
