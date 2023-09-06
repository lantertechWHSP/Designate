import { ILink } from '~/interfaces/util/link';

export interface IMenuLink {
    title?:string;
    link?:ILink;
    externalLink?:string;
    children?:IMenuLink[]|any;
}
