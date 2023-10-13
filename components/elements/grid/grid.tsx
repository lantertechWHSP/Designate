import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';

const gutter:number = 4; // Charka width

export enum ColumnValues {
    OneTwelfth = '8.33333333333%',
    TwoTwelfths = '16.6666666667%',
    Quarter = '25%',
    Third = '33.3333333333%',
    FiveTwelfths = '41.6666666667%',
    Half = '50%',
    SevenTwelfths = '58.3333333333%',
    TwoThirds = '66.6666666667%',
    ThreeQuarters = '75%',
    TenTwelfths = '83.3333333333%',
    ElevenTwelfths = '91.6666666667%',
    Full = '100%'
}

interface IRow {
    direction:any;
}

interface IColumn {
    width:string[];
}

export const Row:any = ({ direction = ['row'], justify = ['center'], children }) : ReactNode => {
    return <Flex direction={direction} justify={justify} mx={-gutter}>
        {children}
    </Flex>
}

export const Column:any = ({ width = [ColumnValues.Full], children }) : ReactNode => {
    return <Box width={width} px={gutter}>
        {children}
    </Box>
}
