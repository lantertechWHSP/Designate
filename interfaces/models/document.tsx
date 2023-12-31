import { IFile } from '~/interfaces/util/file';
import { IFilter } from '~/interfaces/util/filter';
import {IImage} from "~/interfaces/util/image";

export interface IDocumentCategory {
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
    category?:IDocumentCategory;
    tags?:IDocumentTags[];
    document?:IFile;
    coverImage?:IImage;
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
