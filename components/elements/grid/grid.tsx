import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';

export const gutter:number = 4; // Charka width

export enum ColumnValues {
    Twelfth = '8.33333333333%',
    TwoTwelfths = '16.6666666667%',
    FiveTwelfths = '41.6666666667%',
    SevenTwelfths = '58.3333333333%',
    TenTwelfths = '83.3333333333%',
    ElevenTwelfths = '91.6666666667%',

    Third = '33.3333333333%',
    TwoThirds = '66.6666666667%',

    Quarter = '25%',
    ThreeQuarters = '75%',

    Half = '50%',
    Full = '100%'
}

interface IRow extends ChakraProps {
    direction:any;
}

interface IColumn extends ChakraProps {
    width:string[];
}

export const Row:any = ({ direction = ['row'], justify = ['flex-start'], children, ...props }:IRow) : ReactNode => {
    return <Flex wrap="wrap" direction={direction} justify={justify} mx={-gutter} {...props}>
        {children}
    </Flex>
}

export const Column:any = ({ width = [ColumnValues.Full], children, ...props }:IColumn) : ReactNode => {
    return <Box width={width} px={gutter} {...props}>
        {children}
    </Box>
}
