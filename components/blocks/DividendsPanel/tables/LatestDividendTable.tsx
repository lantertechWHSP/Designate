import { ReactNode } from 'react';
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { IDividendsTable, IDividendsTableRow, IDividendsTableTitle } from '~/components/blocks/DividendsPanel/interfaces';

interface ILatestDividendTableProps {
    isLoaded?:boolean;
    table:IDividendsTable;
}

export const LatestDividendTable:Function = ({ isLoaded, table }:ILatestDividendTableProps) : ReactNode => {
    return <>
        {
            isLoaded && <> {
                table ? <TableContainer>
                    <Table variant="basic" w="100%">
                        <>
                            {
                                (Array.isArray(table?.titles) && table.titles.length > 0) && <Thead>
                                    <Tr>
                                        {
                                            table.titles.map((th:IDividendsTableTitle, index:number) => {
                                                return <Th key={index} w="20%">{th.title}</Th>;
                                            })
                                        }
                                    </Tr>
                                </Thead>
                            }
                        </>
                        <>
                            {
                                (Array.isArray(table?.rows) && table.rows.length > 0) && <Tbody>
                                    {
                                        (() => {
                                            const row:IDividendsTableRow = table.rows[0];
                                            return <Tr>
                                                <Td>
                                                    {
                                                        row.Dividend || '-'
                                                    }
                                                </Td>
                                                <Td>
                                                    {
                                                        row.ExpiryDate || '-'
                                                    }
                                                </Td>
                                                <Td>
                                                    {
                                                        row.Franking || '-'
                                                    }
                                                </Td>
                                                <Td>
                                                    {
                                                        row.Type || '-'
                                                    }
                                                </Td>
                                                <Td>
                                                    {
                                                        row.PaymentDate || '-'
                                                    }
                                                </Td>
                                            </Tr>;
                                        })()
                                    }
                                </Tbody>
                            }
                        </>
                    </Table>
                </TableContainer> : <Box>
                    Could not load Dividend History table…
                </Box>
            }
            </>
        }
    </>;
};
