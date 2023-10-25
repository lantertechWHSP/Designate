import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Alert } from '@chakra-ui/react';

interface ITableRow {
    Dividend:string;
    ExpiryDate:string;
    Franking:number;
    Type:string;
    PaymentDate:string;
}

interface IDividendHistoryTableBlock extends IBlock {
    table:ITable<ITableRow>;
}

const DividendHistoryTableBlock:any = ({ table, paddingTop, paddingBottom }:IDividendHistoryTableBlock) : ReactNode => {
    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            (table && table.data && Array.isArray(table?.data) && table.data.length > 0) ? <TableContainer>
                <Table variant="basic" w="100%">
                    <Thead>
                        <Tr>
                            <Th w="20%">
                                Dividend
                            </Th>
                            <Th w="20%">
                                Expiry Date
                            </Th>
                            <Th w="20%">
                                Franking (%)
                            </Th>
                            <Th w="20%">
                                Type
                            </Th>
                            <Th w="20%">
                                Payment Date
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
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
                </Table>
            </TableContainer> : <Alert status="info">No Dividend Data</Alert>
        }
    </ContentBlock>;
};

export default DividendHistoryTableBlock;
