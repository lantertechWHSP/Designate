import { IDatoLink } from '~/interfaces/datoLink';

export interface IMenuItemLink {
    title?:string;
    link?:IDatoLink;
    externalLink?:string;
    children?:IMenuItemLink[]|any;
}
