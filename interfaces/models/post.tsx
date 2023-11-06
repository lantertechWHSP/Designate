import { ISEO } from '~/interfaces/util/seo';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { IAuthor } from '~/interfaces/models/author';

export interface IPost {
    id?:string
    title?:string;
    author?:IAuthor;
    summary?:IStructuredText;
    image?:IImage;
    publishDate?:string;
    isFeatured?:boolean;
    slug?:string;
    seo?:ISEO;
    blocks?:IBlock[];
}
