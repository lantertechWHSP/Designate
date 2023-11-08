import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';
import { Box, TableContainer, Heading, Table, Thead, Tr, Th, Tbody, Td, Alert, Button, Flex, Spinner } from '@chakra-ui/react';

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
    const allData = table.data;

    const itemsPerPage:number = 10;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [currentData, setCurrentData] = useState<ITableRow[]>(allData.slice(0, (pageNumber * itemsPerPage)));

    const [isLoading, setIsLoading] = useState(false);

    const loadMore:any = () => {
        setIsLoading(true);

        setTimeout(() => {
            const newPageNumber:number = pageNumber + 1;
            setCurrentData([...currentData, ...allData.slice((pageNumber * itemsPerPage), (newPageNumber * itemsPerPage))])
            setPageNumber(newPageNumber);
            setIsLoading(false);
        }, 500);
    }

    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Heading as="h2" variant="sectionHeading" mb={[4, ,8]}>
            Dividend History
        </Heading>
        {
            (table && table.data && Array.isArray(table?.data) && table.data.length > 0) ? <Box>

                <TableContainer>
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
                                currentData.map((row:ITableRow, index:number) => {
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
                </TableContainer>
                {
                    (currentData.length < allData.length) && <Flex py={8} justify="center">
                        <Button variant="button" onClick={loadMore} rightIcon={isLoading && <Spinner size='sm' />}>
                            Load More
                        </Button>
                    </Flex>
                }
            </Box>: <Alert status="info">No Dividend Data</Alert>
        }
    </ContentBlock>;
};

export default DividendHistoryTableBlock;
