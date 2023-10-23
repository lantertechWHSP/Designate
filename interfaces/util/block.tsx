import { BackgroundColor, ContainerWidth, PaddingBottom, PaddingTop, TextColor } from '~/components/blocks/Content';

export interface IBlock {
    id?:string;
    __typename?:string;

    containerWidth?:ContainerWidth;
    background?:BackgroundColor;
    textColor?:TextColor;
    paddingTop?:PaddingTop;
    paddingBottom?:PaddingBottom;

    // External
    data?:any;
    getData?:() => any;
}
