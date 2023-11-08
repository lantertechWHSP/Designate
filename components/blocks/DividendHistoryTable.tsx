import { ReactNode, useState, useEffect } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';
import { Box, TableContainer, Heading, Table, Thead, Tr, Th, Tbody, Td, Alert, Flex, ButtonGroup, Button, Text } from '@chakra-ui/react';
import {Icon, Icons} from "~/components/elements/icon";

interface ITableRow {
    Dividend:string;
    ExDate:string;
    Franking:number;
    Type:string;
    PaymentDate:string;
}

interface IDividendHistoryTableBlock extends IBlock {
    table:ITable<ITableRow>;
}

const DividendHistoryTableBlock:any = ({ table, paddingTop, paddingBottom }:IDividendHistoryTableBlock) : ReactNode => {
    const allData:ITableRow[] = table.data;
    const [paginationNumbers, setPaginationNumbers] = useState([]);

    const itemsPerPage:number = 15;
    const maxPages:number = Math.ceil(allData.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentData, setCurrentData] = useState<ITableRow[]>(allData.slice(0, (currentPage * itemsPerPage)));

    useEffect(() => {
        setPaginationNumbers(getPaginationNumbers());
    }, [currentPage]);

    const loadPrevious:any = () => {
        const prevPageNumber:number = currentPage - 1;
        if(prevPageNumber >= 1) {
            setCurrentData(allData.slice(((prevPageNumber - 1) * itemsPerPage), (prevPageNumber * itemsPerPage)));
            setCurrentPage(prevPageNumber);
        }
    };

    const loadPage:any = (index:number) => {
        setCurrentData(allData.slice(((index - 1) * itemsPerPage), (index * itemsPerPage)));
        setCurrentPage(index);
    };

    const loadNext:any = () => {
        const nextPageNumber:number = currentPage + 1;
        if(nextPageNumber <= maxPages) {
            setCurrentData(allData.slice(((nextPageNumber - 1) * itemsPerPage), (nextPageNumber * itemsPerPage)));
            setCurrentPage(nextPageNumber);
        }
    };

    const getPaginationNumbers:any = () => {
        const getRange:any = (start: number, end: number) : any => {
            const length:number = end - start + 1;
            return Array.from({ length }, (_, i) => start + i);
        };

        const pagination:any = (currentPage: number, pageCount: number, delta: number) : number[] => {
            const pages: number[] = [];

            if (currentPage <= delta) {
                pages.push(...getRange(1, Math.min(pageCount, delta * 2 + 1)));
            } else if (currentPage > pageCount - delta) {
                pages.push(...getRange(Math.max(1, pageCount - delta * 2), pageCount));
            } else {
                pages.push(...getRange(Math.max(1, currentPage - delta), Math.min(pageCount, currentPage + delta)));
            }

            return pages;
        };

        return pagination(currentPage, maxPages, 2);
    };

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
                                    Ex Date
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
                                                row.ExDate || '-'
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
                    (paginationNumbers && paginationNumbers.length > 1) && <Flex direction="row" justify="space-between" align="center" mt={8}>
                        <Box>
                            <Button variant="paginationDirection"
                                data-yourir="prevPage"
                                m={0}
                                isDisabled={currentPage <= 1}
                                onClick={loadPrevious}>
                                <Flex align="center"
                                    display="inline-flex"
                                    borderBottom="1px solid"
                                    borderColor="oliveBlur"
                                    fontWeight={700}>
                                    <Icon icon={Icons.ChevronLeft} w={12} h={12} />
                                    <Text as="span" ml={2}>
                                        Prev
                                    </Text>
                                </Flex>
                            </Button>
                        </Box>
                        <Box>
                            <ButtonGroup spacing={0}>
                                {
                                    paginationNumbers.map((number:number, index:number) => {
                                        return <Button onClick={() => {
                                            loadPage(number);
                                        }} variant="pagination" isActive={currentPage === number} key={index}>
                                            {number}
                                        </Button>;
                                    })
                                }
                            </ButtonGroup>
                        </Box>
                        <Box>
                            <Button variant="paginationDirection"
                                data-yourir="nextPage"
                                m={0}
                                isDisabled={currentPage >= maxPages}
                                onClick={loadNext}>
                                <Flex align="center"
                                    display="inline-flex"
                                    borderBottom="2px solid"
                                    borderColor="oliveBlur"
                                    transition="border-color 0.3s linear"
                                    _hover={{
                                        borderColor: 'olive'
                                    }}
                                    fontWeight={700}>
                                    <Text as="span" mr={2}>
                                        Next
                                    </Text>
                                    <Icon icon={Icons.ChevronRight} w={12} h={12} />
                                </Flex>
                            </Button>
                        </Box>
                    </Flex>


                    // <Flex py={8} justify="center">
                    //     <Button variant="button" onClick={loadMore} rightIcon={isLoading && <Spinner size='sm' />}>
                    //         Load More
                    //     </Button>
                    // </Flex>
                }
            </Box>: <Alert status="info">No Dividend Data</Alert>
        }
    </ContentBlock>;
};

export default DividendHistoryTableBlock;
