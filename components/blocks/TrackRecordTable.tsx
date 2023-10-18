import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react';
import { ITable } from '~/interfaces/util/table';

interface ITrackRecordTableBlock {
    title?:string;
    table?:ITable<any>;
}

const TrackRecordTableBlock:any = ({ title, table }:ITrackRecordTableBlock) : ReactNode => {
    return <ContentBlock py={[6, 8, 12]}>
        {
            title && <Heading as="h2" variant="sectionSubheading" mb={4}>
                {title}
            </Heading>
        }
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
                                                return <Td key={columnIndex} fontWeight={500} minWidth="80px" pr={2}>
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
            </TableContainer> : <Text variant="caption">No Data Availiable</Text>
        }
    </ContentBlock>;
};

export default TrackRecordTableBlock;
