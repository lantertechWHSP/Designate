import React, { ReactNode } from 'react';
import { Icon, Icons } from '~/components/elements/icon';
import { YourIR } from 'yourir-next';
import { Heading, Container, Flex, Box, ButtonGroup, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

const ShareHistoricalPricesTable = () : ReactNode => {
    const scrollToTable = () : void => {
        const scrollDiv = document.getElementById("historical-price").offsetTop;
        window.scrollTo({ top: scrollDiv - 120, behavior: 'smooth'});
    };

    return <Box py={12} id="historical-price">
        <Box as={YourIR}>
            <Container>
                <Heading as="h2" variant="h2" mb={8}>
                    Historical Prices
                </Heading>
                <Box data-yourir="historicalPrices pageSize=10">
                    <Box overflowX="auto">
                        <TableContainer>
                            <Table variant="basic" w="100%">
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th w={[, , , '15%']}>Volume</Th>
                                        <Th w={[, , , '15%']}>Change</Th>
                                        <Th w={[, , , '15%']}>Close</Th>
                                    </Tr>
                                </Thead>
                                <Tbody data-yourir="items">
                                    <Tr>
                                        <Td data-yourir="$cur.date" />
                                        <Td data-yourir="$cur.volume" />
                                        <Td data-yourir="$cur.change" />
                                        <Td data-yourir="$cur.close" />
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Flex direction="row" justify="space-between" align="center" mt={8}>
                        <Box>
                            <Button variant="pagination"
                                    data-yourir="prevPage"
                                    leftIcon={<Icon icon={Icons.ChevronLeft} w={12} h={12} />}
                                    onClick={scrollToTable}>
                                Prev
                            </Button>
                        </Box>
                        <Box>
                            <ButtonGroup spacing={0}
                                         sx={
                                             {
                                                 '.yourir-active': {
                                                     background: 'lightGrey3',
                                                     borderRadius: 0
                                                 },
                                                 '[disabled]': {
                                                     display: 'none'
                                                 }
                                             }
                                         }>
                                <Button variant="pagination"
                                        data-yourir="navPage1"
                                        onClick={scrollToTable}>
                                </Button>
                                <Button variant="pagination"
                                        data-yourir="navPage2"
                                        onClick={scrollToTable}>
                                </Button>
                                <Button variant="pagination"
                                        data-yourir="navPage3"
                                        onClick={scrollToTable}>
                                </Button>
                                <Button variant="pagination"
                                        data-yourir="navPage4"
                                        onClick={scrollToTable}>
                                </Button>
                                <Button variant="pagination"
                                        data-yourir="navPage5"
                                        onClick={scrollToTable}>
                                </Button>

                            </ButtonGroup>
                        </Box>
                        <Box>
                            <Button variant="pagination"
                                    data-yourir="nextPage"
                                    rightIcon={<Icon icon={Icons.ChevronRight} w={12} h={12} />}
                                    onClick={scrollToTable}>
                                Next
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Box>
    </Box>;
};

export default ShareHistoricalPricesTable;
