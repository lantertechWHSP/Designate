import { IFile } from '~/interfaces/util/file';
import { IFilter } from '~/interfaces/util/filter';

export interface IDocumentCategory {
    id?:string;
    label?:string;
    subcategories?:IDocumentSubcategory[];
}

export interface IDocumentSubcategory {
    id?:string;
    label?:string;
}

export interface IDocumentTags {
    id?:string;
    label?:string;
}

export interface IDocument {
    title?:string;
    date?:string;
    categories?:IDocumentCategory[];
    subcategories?:IDocumentCategory[];
    tags?:IDocumentTags[];
    document?:IFile;
}

export interface IDocumentBundle {
    title:string;
    documents:IDocument[];
}

export interface IDocumentsMeta {
    count?:number;
}

export interface IDocumentsFilters {
    yearFilters:IFilter[];
    tagFilters:IFilter[];
}
