import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';
import { Heading, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Alert } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

interface ITableRow {
    Dividend:string;
    ExpiryDate:string;
    Franking:number;
    Type:string;
    PaymentDate:string;
}

interface IDividendLatestTableBlock extends IBlock {
    description:string;
    table:ITable<ITableRow>;
}

const DividendLatestTableBlock:any = ({ table, description, paddingTop, paddingBottom }:IDividendLatestTableBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Heading as="h2" variant="sectionHeading" mb={[4, ,8]}>
            Latest Dividend
        </Heading>
        {
            description && <Row>
                <Column width={[ColumnWidth.Full, , ColumnWidth.Half]}>
                    <Box fontSize={['19px']} lineHeight={['29px']} mb={8}>
                        {description}
                    </Box>
                </Column>
            </Row>
        }
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

export default DividendLatestTableBlock;
