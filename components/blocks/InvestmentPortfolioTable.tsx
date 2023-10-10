import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Heading, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Progress } from '@chakra-ui/react';
import { sumBy as _sumBy, round as _round } from 'lodash';
import { DateTime } from 'luxon';
import { ITable } from '~/interfaces/util/table';

interface ITableRow {
    Portfolio:string;
    NetAssetValue:string;
}

interface InvestmentPortfolioTableBlock extends ChakraProps {
    table:ITable<ITableRow>;
    lastUpdated:any;
}

const InvestmentPortfolioTableBlock:any = ({ table, lastUpdated }:InvestmentPortfolioTableBlock) : ReactNode => {
    const total:number = _sumBy(table.data, (row:ITableRow) => {
        const value:number = +row.NetAssetValue;
        return value;
    });

    return <ContentBlock py={8}>
        <Box mb={8}>
            <Heading as="h2">
                Our Portfolio
            </Heading>
            <Text>
                Total Value: ${_round(total / 1000, 2)} Billion
            </Text>
        </Box>
        <TableContainer>
            <Table variant="basic" w="100%">
                {
                    Array.isArray(table.columns) && table.columns.length > 0 && <Thead>
                        <Tr>
                            <Th width="20%">
                                Portfolio
                            </Th>
                            <Th width="20%">
                                Net Asset Value (M)
                            </Th>
                            <Th width="20%">
                                Percentage
                            </Th>
                            <Th width="40%">
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
                                    <Td>
                                        {percentage ? `${percentage}%` : '-'}
                                    </Td>
                                    <Td>
                                        {
                                            percentage ? <Progress size='sm' value={percentage} /> : <>-</>
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
            lastUpdated && <Text mt={4}>
                Last updated at {DateTime.fromFormat(lastUpdated, "yyyy-mm-dd").toFormat('d/MM/yyyy')}
            </Text>
        }
    </ContentBlock>;
};

export default InvestmentPortfolioTableBlock;
