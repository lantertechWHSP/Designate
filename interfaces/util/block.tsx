import { BackgroundColor, ContainerWidth, PaddingBottom, PaddingTop, TextColor, Theme } from '~/components/blocks/Content';

export interface IBlock {
    id?:string;
    __typename?:string;

    containerWidth?:ContainerWidth;
    background?:BackgroundColor;
    textColor?:TextColor;
    paddingTop?:PaddingTop;
    paddingBottom?:PaddingBottom;
    theme?:Theme;
    contain?:boolean;
    content?: {
        blocks?:IBlock[];
    }
    // External
    data?:any;
    getData?:() => any;
}
