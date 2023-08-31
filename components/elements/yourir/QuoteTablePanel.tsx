import React, { ReactNode } from 'react';
import { YourIR } from 'yourir-next';
import { Heading, Container, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

const QuoteTablePanel = () : ReactNode => {
    return <Box py={12}>
        <Box as={YourIR}>
            <Container>
                <Heading as="h2" variant="h2" mb={8}>
                    Quote Table
                </Heading>
                <TableContainer>
                    <Table variant="sharePrice" w="100%">
                        <Thead>
                            <Tr whiteSpace="nowrap">
                                <Th>Price</Th>
                                <Th >Movement +/-</Th>
                                <Th>Volume</Th>
                                <Th>Daily High</Th>
                                <Th>Daily Low</Th>
                                <Th>52 Week Range</Th>
                                <Th>Market Cap.</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <span data-yourir="price"></span>
                                </Td>
                                <Td>
                                    <span data-yourir="change"></span>
                                </Td>
                                <Td>
                                    <span data-yourir="volume"></span>
                                </Td>
                                <Td>
                                    <span data-yourir="high"></span>
                                </Td>
                                <Td>
                                    <span data-yourir="low"></span>
                                </Td>
                                <Td>
                                    <span data-yourir="yearLow"></span> /{' '}
                                    <span data-yourir="yearHigh"></span>
                                </Td>
                                <Td>
                                    <span data-yourir="marketCap scale=true"></span>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    </Box>
}

export default QuoteTablePanel;
