import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';
import { Heading, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Alert } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import {tableOverflowMargin} from "~/lib/theme/theme";
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface ITableRow {
    Dividend:string;
    ExDate:string;
    Franking:number;
    Type:string;
    PaymentDate:string;
}

interface IDividendLatestTableBlock extends IBlock {
    title?:string;
    description:string;
    table:ITable<ITableRow>;
}

const DividendLatestTableBlock:any = ({ title, table, description, paddingTop, paddingBottom }:IDividendLatestTableBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            description && <Row>
                <Column width={[ColumnWidth.Full, , ColumnWidth.Half]}>
                    <Box fontSize={['19px']} lineHeight={['29px']} mb={8}>
                        <AnimateOverflow>
                            {description}
                        </AnimateOverflow>
                    </Box>
                </Column>
            </Row>
        }
        {
            (table && table.data && Array.isArray(table?.data) && table.data.length > 0) ? <Box mr={tableOverflowMargin}><TableContainer>
                <Table variant="basic" w="100%">
                    <Thead>
                        <Tr>
                            <Th w="20%">
                                <AnimateOverflow>
                                    Dividend
                                </AnimateOverflow>
                            </Th>
                            <Th w="20%">
                                <AnimateOverflow>
                                    ExDate
                                </AnimateOverflow>
                            </Th>
                            <Th w="20%">
                                <AnimateOverflow>
                                    Franking (%)
                                </AnimateOverflow>
                            </Th>
                            <Th w="20%">
                                <AnimateOverflow>
                                    Type
                                </AnimateOverflow>
                            </Th>
                            <Th w="20%">
                                <AnimateOverflow>
                                    Payment Date
                                </AnimateOverflow>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            table.data.map((row:ITableRow, index:number) => {
                                return <Tr key={index}>
                                    <Td>
                                        <AnimateOverflow>
                                            {
                                                row.Dividend || '-'
                                            }
                                        </AnimateOverflow>
                                    </Td>
                                    <Td>
                                        <AnimateOverflow>
                                            {
                                                row.ExDate || '-'
                                            }
                                        </AnimateOverflow>
                                    </Td>
                                    <Td>
                                        <AnimateOverflow>
                                            {
                                                row.Franking || '-'
                                            }
                                        </AnimateOverflow>
                                    </Td>
                                    <Td>
                                        <AnimateOverflow>
                                            {
                                                row.Type || '-'
                                            }
                                        </AnimateOverflow>
                                    </Td>
                                    <Td>
                                        <AnimateOverflow>
                                            {
                                                row.PaymentDate || '-'
                                            }
                                        </AnimateOverflow>
                                    </Td>
                                </Tr>;
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer></Box> : <Alert status="info">No Dividend Data</Alert>
        }
    </ContentBlock>;
};

export default DividendLatestTableBlock;
