import { ISEO } from '~/interfaces/util/seo';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';

export interface IPost {
    id?:string
    title?:string;
    image?:IImage;
    publishDate?:string;
    isFeatured?:boolean;
    slug?:string;
    seo?:ISEO;
    blocks?:IBlock[];
}
