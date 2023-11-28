import { ISEO } from '~/interfaces/util/seo';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';
import { IAuthor } from '~/interfaces/models/author';

export interface IPost {
    id?:string
    title?:string;
    author?:IAuthor;
    image?:IImage;
    imageCaption?:string;
    iconType?:string;
    publishDate?:string;
    slug?:string;
    seo?:ISEO;
    blocks?:IBlock[];
}
