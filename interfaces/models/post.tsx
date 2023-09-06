import { ISEO } from '~/interfaces/util/seo';
import { IBlock } from '~/interfaces/util/block';

export interface IPost {
    id?:string
    title?:string;
    publishDate?:string;
    isFeatured?:boolean;
    slug?:string;
    seo?:ISEO;
    blocks?:IBlock[];
}
