import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { Heading, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Progress } from '@chakra-ui/react';
import { sumBy as _sumBy, round as _round } from 'lodash';

interface ITableData {
    Portfolio:string;
    NetAssetValue:number;
}

interface InvestmentPortfolioTableBlockProps extends ChakraProps {
    table:IDatoTable<ITableData>
}

const InvestmentPortfolioTableBlock:any = ({ table }:InvestmentPortfolioTableBlockProps) : ReactNode => {
    const total = _sumBy(table.data, (datum:ITableData) => {
        const value:number = +datum.NetAssetValue;
        return value;
    })

    return <ContentBlock py={8}>
        <Heading as="h2">
            Our Portfolio
        </Heading>
        <Text>
            Total Value: ${_round(total / 1000, 2)} Billion
        </Text>
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
                            table.data.map((row:ITableData, index:number) => {
                                const percentage:number = _round(((+row.NetAssetValue / total) * 100), 1);

                                return <Tr key={index}>
                                    <Td>
                                        {row.Portfolio}
                                    </Td>
                                    <Td>
                                        {row.NetAssetValue}
                                    </Td>
                                    <Td>
                                        {percentage}%
                                    </Td>
                                    <Td>
                                        <Progress size='sm' value={percentage} />
                                    </Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                }
            </Table>
        </TableContainer>
    </ContentBlock>
}

export default InvestmentPortfolioTableBlock;
