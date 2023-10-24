import { ReactNode } from 'react';
import { Box, Container, ResponsiveValue } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from "~/components/elements/grid/grid";

export enum ContainerWidth {
    Default = 'Default',
    Full = 'Full',
    Wide = 'Wide',
    Narrow = 'Narrow',
}

export enum BackgroundColor {
    White = 'White',
    BrownGrey = 'BrownGrey',
    GhostWhite = 'GhostWhite',
    DarkBrown = 'DarkBrown'
}

export enum TextColor {
    DarkBrown = 'DarkBrown',
    White = 'White'
}

export enum PaddingTop {
    Default = 'Default',
    None = 'None'
}

export enum PaddingBottom {
    Default = 'Default',
    None = 'None'
}

export enum Theme {
    Light = 'Light',
    Dark = 'Dark'
}

interface IContentBlock {
    children?:any;
    contain?:boolean;
    background?:BackgroundColor|ResponsiveValue<any>|string;
    color?:TextColor|ResponsiveValue<any>|string;
    paddingTop?:PaddingTop|ResponsiveValue<any>|string;
    paddingBottom?:PaddingBottom|ResponsiveValue<any>|string;
    containerWidth?:ContainerWidth;
}

export const getTextColor:any = (color:TextColor|ResponsiveValue<any>|string) : TextColor|ResponsiveValue<any>|string => {
    switch(color) {
        case TextColor.White : return 'white';
        case TextColor.DarkBrown : return 'darkBrown';
        default : return color;
    }
};

export const getBackgroundColor:any = (background:BackgroundColor|ResponsiveValue<any>|string) : BackgroundColor|ResponsiveValue<any>|string => {
    switch(background) {
        case BackgroundColor.White : return 'white';
        case BackgroundColor.BrownGrey : return 'brownGrey';
        case BackgroundColor.GhostWhite : return 'ghostWhite';
        case BackgroundColor.DarkBrown : return 'darkBrown';
        default : return background;
    }
};

const ContentBlock:any = ({
    contain = true,
    color = '',
    background = '',
    containerWidth = ContainerWidth.Default,
    children,
    paddingTop = '',
    paddingBottom = '',
    ...props }:IContentBlock) : ReactNode => {
    let columnWidths:ColumnWidth[];
    const selectedBackground:BackgroundColor|ResponsiveValue<any>|string = getBackgroundColor(background);
    const selectedColor:TextColor|ResponsiveValue<any>|string = getTextColor(color);
    let selectedPaddingTop:PaddingTop|ResponsiveValue<any>|string;
    let selectedPaddingBottom:PaddingTop|ResponsiveValue<any>|string;

    switch(containerWidth) {
        case ContainerWidth.Wide : columnWidths = [ColumnWidth.Full, ,ColumnWidth.TenTwelfths]; break;
        case ContainerWidth.Narrow : columnWidths = [ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]; break;
        case ContainerWidth.Full : columnWidths = [ColumnWidth.Full]; break;
        default : columnWidths = [ColumnWidth.Full];
    }

    switch(paddingTop) {
        case PaddingTop.Default : selectedPaddingTop = [6, 8, 12]; break;
        case PaddingTop.None : selectedPaddingTop = [0]; break;
        default : selectedPaddingTop = [6, 8, 12]; break;
    }

    switch(paddingBottom) {
        case PaddingBottom.Default : selectedPaddingBottom = [6, 8, 12]; break;
        case PaddingBottom.None : selectedPaddingBottom = [0]; break;
        default : selectedPaddingBottom = [6, 8, 12]; break;
    }

    return <Box color={selectedColor} background={selectedBackground} paddingTop={selectedPaddingTop} paddingBottom={selectedPaddingBottom} {...props}>
        {
            contain ? <Container>
                {
                    <Row justify={['center']}>
                        <Column width={columnWidths}>
                            {children}
                        </Column>
                    </Row>
                }
            </Container> : <>
                {
                    containerWidth !== ContainerWidth.Default ? <Row justify={['center']}>
                        <Column width={columnWidths}>
                            {children}
                        </Column>
                    </Row> : <>{children}</>
                }
            </>
        }
    </Box>;
};

export default ContentBlock;
