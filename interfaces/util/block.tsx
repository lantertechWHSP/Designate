import { ContainerWidth } from '~/components/blocks/Content';

export interface IBlock {
    id?:string;
    __typename?:string;

    containerWidth?:ContainerWidth;

    // External
    data?:any;
    getData?:() => any;
}
