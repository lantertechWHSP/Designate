import React, { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from "~/components/blocks/Content";
import { Icon, Icons } from '~/components/elements/icon';
import { YourIR } from 'yourir-next';
import { Heading, Flex, Text, Box, ButtonGroup, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import {tableOverflowMargin} from "~/lib/theme/theme";

interface ShareHistoricalPricesTable extends IBlock {
}

const ShareHistoricalPricesTable:any = ({ paddingTop, paddingBottom }:ShareHistoricalPricesTable) : ReactNode => {
    const scrollToTable:any = () : void => {
        const scrollDiv:number = document.getElementById("historical-price").offsetTop;
        window.scrollTo({ top: scrollDiv - 160, behavior: 'smooth'});
    };

    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom} id="historical-price">
        <Box as={YourIR}>
            <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                Historical Prices
            </Heading>
            <Box data-yourir="historicalPrices pageSize=10">
                <Box mr={tableOverflowMargin}>
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
                        <Button variant="paginationDirection"
                            data-yourir="prevPage"
                            m={0}
                            onClick={scrollToTable}>
                            <Flex align="center"
                                display="inline-flex"
                                borderBottom="1px solid"
                                borderColor="oliveBlur2"
                                fontWeight={700}>
                                <Icon icon={Icons.ChevronLeft} w={12} h={12} />
                                <Text as="span" ml={2}>
                                    Prev
                                </Text>
                            </Flex>
                        </Button>
                    </Box>
                    <Box>
                        <ButtonGroup spacing={0}
                            sx={
                                {
                                    '.yourir-active': {
                                        background: 'olive',
                                        color: 'white',
                                        borderRadius: '50%'
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
                        <Button variant="paginationDirection"
                            data-yourir="nextPage"
                            m={0}
                            onClick={scrollToTable}>
                            <Flex align="center"
                                display="inline-flex"
                                borderBottom="2px solid"
                                borderColor="oliveBlur2"
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
            </Box>
        </Box>
    </ContentBlock>;
};

export default ShareHistoricalPricesTable;
