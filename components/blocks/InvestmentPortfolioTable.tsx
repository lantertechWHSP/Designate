import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex } from '@chakra-ui/react';
import { sumBy as _sumBy, round as _round } from 'lodash';
import { DateTime } from 'luxon';
import { ITable } from '~/interfaces/util/table';

interface ITableRow {
    Portfolio:string;
    NetAssetValue:string;
}

interface InvestmentPortfolioTableBlock extends IBlock, ChakraProps {
    table?:ITable<ITableRow>;
    lastUpdated?:any;
}

interface IPercentageBar {
    value:number;
}

const PercentageBar:any = ({ value }:IPercentageBar) => {
    const remainder:number = value - 100;

    return <Box>
        {
            (value >= 0 && value <= 100) && <Flex height="24px" direction="row" width={'100%'} borderRadius="3px" background="rgba(255, 255, 255, 0.1)">
                {
                    value >= 0 && value <= 80 ? <>
                        <Box width={`${value}%`} background="white" borderRadius="3px" height="24px" />
                        <Box width={`${remainder}%`} px={2}>
                            {value}%
                        </Box>
                    </> : <>
                        <Box width={`${value}%`} textAlign="right" background="white" borderRadius="3px" px={2} height="24px" color="darkBrown">
                            {value}%
                        </Box>
                    </>
                }
            </Flex>
        }
    </Box>;
};

const InvestmentPortfolioTableBlock:any = ({ table, lastUpdated, paddingTop, paddingBottom }:InvestmentPortfolioTableBlock) : ReactNode => {
    const [total] = useState<number>(table.data ? _sumBy(table.data, (row:ITableRow) => {
        const value:number = +row.NetAssetValue;
        return value;
    }) : 0);

    return <ContentBlock background="darkBrown" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box mb={8}>
            <Heading as="h2" variant="sectionHeading" color="white">
                Our Portfolio
            </Heading>
        </Box>
        <TableContainer>
            <Table variant="basic" w="100%" color="white">
                {
                    Array.isArray(table.columns) && table.columns.length > 0 && <Thead>
                        <Tr>
                            <Th width={['50%', ,'20%']} color="whiteBlur">
                                Portfolio
                            </Th>
                            <Th width={['35%', ,'20%']}  color="whiteBlur">
                                Net Asset Value (M)
                            </Th>
                            <Th width={['15%', ,'60%']}  color="whiteBlur">
                                Weighting
                            </Th>
                        </Tr>
                    </Thead>
                }
                {
                    (Array.isArray(table?.data) && table.data.length > 0) && <Tbody>
                        {
                            table.data.map((row:ITableRow, index:number) => {
                                const percentage:number = _round(((+row.NetAssetValue / total) * 100), 1);

                                return <Tr key={index}>
                                    <Td>
                                        {row.Portfolio || '-'}
                                    </Td>
                                    <Td>
                                        {row.NetAssetValue || '-'}
                                    </Td>
                                    <Td verticalAlign="middle">
                                        {
                                            percentage ? <>
                                                <Box display={['none', , 'block']} >
                                                    <PercentageBar value={percentage} />
                                                </Box>
                                                <Box display={['block', ,'none']}>
                                                    {percentage}%
                                                </Box>
                                            </> : <>-</>
                                        }
                                    </Td>
                                </Tr>;
                            })
                        }
                    </Tbody>
                }
            </Table>
        </TableContainer>
        {
            lastUpdated && <Text mt={4} fontSize="14px" color="white">
                Last updated at {DateTime.fromFormat(lastUpdated, "yyyy-mm-dd").toFormat('d/MM/yyyy')}
            </Text>
        }
    </ContentBlock>;
};

export default InvestmentPortfolioTableBlock;
