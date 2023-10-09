import { ReactNode } from 'react';
import ContentBlock from "~/components/blocks/Content";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

interface IShareholderReturnsTableBlock {
    table:IDatoTable<any>;
}

const ShareholderReturnsTableBlock:any = ({ table }:IShareholderReturnsTableBlock) : ReactNode => {
    return <ContentBlock mb={8}>
        {
            table.data && table.data.length > 0 ? <TableContainer>
                <Table variant="basic" w="100%">
                    {
                        Array.isArray(table.columns) && table.columns.length > 0 && <Thead>
                            <Tr>
                                {
                                    table.columns.map((column:string) => {
                                        return <Th>
                                            {column}
                                        </Th>
                                    })
                                }
                            </Tr>
                        </Thead>
                    }
                    {
                        (Array.isArray(table?.data) && table.data.length > 0) && <Tbody>
                            {
                                table.data.map((row) => {
                                    return <Tr>
                                        {
                                            table.columns.map((column) => {
                                                return <Td>
                                                    {row[column]}
                                                </Td>
                                            })
                                        }
                                    </Tr>
                                })
                            }
                        </Tbody>
                    }
                </Table>
            </TableContainer> : <Text variant="caption" color="lightGrey">No Data Availiable</Text>
        }
    </ContentBlock>;
}

export default ShareholderReturnsTableBlock;
