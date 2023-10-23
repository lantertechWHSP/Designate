import { ILink } from '~/interfaces/util/link';
import { IBlock } from '~/interfaces/util/block';

export interface IStructuredText {
    value?:string;
    links?:ILink[];
    blocks?:IBlock[];
}
