import {ReactNode} from 'react';
import {Box, Container, ResponsiveValue} from '@chakra-ui/react';
import {ChakraProps} from '@chakra-ui/system';
import {Column, ColumnWidth, Row} from "~/components/elements/grid/grid";

export enum ContainerWidth {
    Default = 'Default',
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

interface IContentBlock extends ChakraProps {
    contain?:boolean;
    children?:any;
    background?:BackgroundColor|ResponsiveValue<any>|string;
    textColor?:TextColor|ResponsiveValue<any>|string;
    containerWidth?:ContainerWidth;
}

const ContentBlock:any = ({ contain = true, color = '', background = '', containerWidth = ContainerWidth.Default, children, ...props }:IContentBlock) : ReactNode => {
    let columnWidths:ColumnWidth[];
    let selectedBackground:BackgroundColor|ResponsiveValue<any>|string;
    let selectedColor:TextColor|ResponsiveValue<any>|string;

    switch(containerWidth) {
        case ContainerWidth.Wide : columnWidths = [ColumnWidth.Full, ,ColumnWidth.TenTwelfths]; break;
        case ContainerWidth.Narrow : columnWidths = [ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]; break;
        default : columnWidths = [ColumnWidth.Full];
    }

    switch(background) {
        case BackgroundColor.White : selectedBackground = 'white'; break;
        case BackgroundColor.BrownGrey : selectedBackground = 'brownGrey'; break;
        case BackgroundColor.GhostWhite : selectedBackground = 'ghostWhite'; break;
        case BackgroundColor.DarkBrown : selectedBackground = 'darkBrown'; break;
        default : selectedBackground = background;
    }

    switch(color) {
        case TextColor.DarkBrown : selectedColor = 'darkBrown'; break;
        case TextColor.White : selectedColor = 'white'; break;
        default : selectedColor = color;
    }

    return <Box color={selectedColor} background={selectedBackground} {...props}>
        {
            contain ? <Container>
                {
                    <Row justify={['center']}>
                        <Column width={columnWidths}>
                            {children}
                        </Column>
                    </Row>
                }
            </Container> : <Box>
                {children}
            </Box>
        }
    </Box>;
};

export default ContentBlock;
