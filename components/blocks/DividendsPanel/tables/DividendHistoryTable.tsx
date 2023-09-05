import { ReactNode } from 'react';
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

export const DividendHistoryTable:Function = ({ isLoaded, table }:any) : ReactNode => {
    return <>
        {
            isLoaded && <>
                {
                    table ? <TableContainer>
                        <Table variant="basic" w="100%">
                            <>
                                {
                                    (Array.isArray(table?.titles) && table.titles.length > 0) && <Thead>
                                        <Tr>
                                            {
                                                table.titles.map((th, index) => {
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
                                            table.rows.map((row, index) => {
                                                return <Tr key={index}>
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
                                            })
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
