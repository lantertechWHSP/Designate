import React, { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { YourIR } from 'yourir-next';
import { Heading, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

interface IShareQuoteTable extends IBlock {
}

const ShareQuoteTable:any = ({ paddingTop, paddingBottom }:IShareQuoteTable) : ReactNode => {
    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box as={YourIR}>
            <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                Quote Table
            </Heading>
            <Box mr={['-16px', '-24px', '-32px', 0]}>
                <TableContainer>
                    <Table variant="basic" w="100%">
                        <Thead>
                            <Tr whiteSpace="nowrap">
                                <Th>Price</Th>
                                <Th minW="100px">Movement +/-</Th>
                                <Th minW="100px">Volume</Th>
                                <Th minW="100px">Daily High</Th>
                                <Th minW="100px">Daily Low</Th>
                                <Th minW="100px">52 Week Range</Th>
                                <Th minW="100px">Market Cap.</Th>
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
            </Box>
        </Box>
    </ContentBlock>;
};

export default ShareQuoteTable;
