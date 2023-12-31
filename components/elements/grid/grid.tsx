import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';

export const gutter:number = 4; // Charka width

export enum ColumnWidth {
    None = '0',

    // Tweltfths
    Twelfth = '8.33333333333%',
    TwoTwelfths = '16.6666666667%',
    ThreeTwelfths = '25%',
    FourTwelvfths = '33.3333333333%',
    FiveTwelfths = '41.6666666667%',
    SixTweltfths = '50%',
    SevenTwelfths = '58.3333333333%',
    EightTwelfths = '66.6666666667%',
    NineTwelfths = '75%',
    TenTwelfths = '83.3333333333%',
    ElevenTwelfths = '91.6666666667%',

    // Quarters
    OneQuarter = '25%',
    TwoQuarters = '50%',
    ThreeQuarters = '75%',

    // Thirds
    OneThird = '33.3333333333%',
    TwoThirds = '66.6666666667%',

    // Half
    Half = '50%',

    // Full
    Full = '100%'
}

interface IRow extends ChakraProps {
    wrap?:any;
    direction?:any;
    justify?:any;
    children?:any;
}

interface IColumn extends ChakraProps {
    width:ColumnWidth|ColumnWidth[];
    children?:any;
    direction?:any;
}

export const Row:any = ({ wrap = ['wrap'], direction = ['row'], justify = ['flex-start'], children, ...props }:IRow) : ReactNode => {
    return <Flex wrap={wrap} direction={direction} justify={justify} mx={-gutter} {...props}>
        {children}
    </Flex>;
};

export const Column:any = ({ width, minWidth, direction = ['column'], children, ...props }:IColumn) : ReactNode => {
    if(!width) {
        width = [ColumnWidth.Full];
    }
    if(!minWidth) {
        minWidth = width;
    }

    return <Flex direction={direction} minWidth={minWidth} width={width} px={gutter} {...props}>
        {children}
    </Flex>;
};
