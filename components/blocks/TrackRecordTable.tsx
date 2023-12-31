import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Alert, Box } from '@chakra-ui/react';
import { ITable } from '~/interfaces/util/table';
import { horizontalScrollMargin } from "~/lib/theme/theme";
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface ITrackRecordTableBlock extends IBlock {
    title?:string;
    table?:ITable<any>;
}

const TrackRecordTableBlock:any = ({ title, table, background, paddingTop, paddingBottom }:ITrackRecordTableBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionSubheading" mb={4}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            table.data && table.data.length > 0 ? <Box mr={horizontalScrollMargin}><TableContainer mb="20px">
                <Table variant="basic" w="100%">
                    {
                        Array.isArray(table.columns) && table.columns.length > 0 && <Thead>
                            <Tr>
                                {
                                    table.columns.map((column:string, index:number) => {
                                        return <Th key={index}>
                                            <AnimateOverflow>
                                                {column}
                                            </AnimateOverflow>
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
                                                    <AnimateOverflow>
                                                        {row[column]}
                                                    </AnimateOverflow>
                                                </Td>;
                                            })
                                        }
                                    </Tr>;
                                })
                            }
                        </Tbody>
                    }
                </Table>
            </TableContainer></Box> : <Alert status="info">No Data Availiable</Alert>
        }
    </ContentBlock>;
};

export default TrackRecordTableBlock;
