import { ReactNode } from 'react';
import ContentBlock from "~/components/blocks/Content";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react';

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
                                    table.columns.map((column:string, index:number) => {
                                        return <Th key={index}>
                                            {column}
                                        </Th>;
                                    })
                                }
                            </Tr>
                        </Thead>
                    }
                    {
                        (Array.isArray(table?.data) && table.data.length > 0) && <Tbody>
                            {
                                table.data.map((row:any, rowIndex:number) => {
                                    return <Tr key={rowIndex}>
                                        {
                                            table.columns.map((column:string, columnIndex:number) => {
                                                return <Td key={columnIndex}>
                                                    {row[column]}
                                                </Td>;
                                            })
                                        }
                                    </Tr>;
                                })
                            }
                        </Tbody>
                    }
                </Table>
            </TableContainer> : <Text variant="caption" color="lightGrey">No Data Availiable</Text>
        }
    </ContentBlock>;
};

export default ShareholderReturnsTableBlock;
