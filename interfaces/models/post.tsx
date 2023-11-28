import { ISEO } from '~/interfaces/util/seo';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';
import { IAuthor } from '~/interfaces/models/author';

// Content type of the post (depends on what the editor wants it to be)
// could potentially be automated down the road
export enum PostCategory {
    Blog = 'Blog',
    Audio = 'Audio',
    Video = 'Video',
    Download = 'Download'
}

export interface IPost {
    id?:string
    title?:string;
    author?:IAuthor;
    coverImage?:IImage;
    coverImageCaption?:string;
    category?:PostCategory;
    publishDate?:string;
    slug?:string;
    seo?:ISEO;
    blocks?:IBlock[];
}
