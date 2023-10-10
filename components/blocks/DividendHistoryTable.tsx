import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

interface ITableRow {
    Dividend:string;
    ExpiryDate:string;
    Franking:number;
    Type:string;
    PaymentDate:string;
}

interface IDividendHistoryTable {
    table:ITable<ITableRow>;
}

const DividendHistoryTableBlock:any = ({ table }:IDividendHistoryTable) : ReactNode => {
    return <ContentBlock py={8}>
        <TableContainer>
            <Table variant="basic" w="100%">
                <>
                    {
                        <Thead>
                            <Tr>
                                <Th>
                                    Dividend
                                </Th>
                                <Th>
                                    Expiry Date
                                </Th>
                                <Th>
                                    Franking (%)
                                </Th>
                                <Th>
                                    Type
                                </Th>
                                <Th>
                                    Payment Date
                                </Th>
                            </Tr>
                        </Thead>
                    }
                </>
                <>
                    {
                        (Array.isArray(table?.data) && table.data.length > 0) && <Tbody>
                            {
                                table.data.map((row:ITableRow, index:number) => {
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
        </TableContainer>
    </ContentBlock>;
};

export default DividendHistoryTableBlock;
