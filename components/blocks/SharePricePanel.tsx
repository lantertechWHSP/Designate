import { ReactNode } from 'react';
import { YourIR, set } from 'yourir-next';
import { Heading, Container, Flex, Box, Grid, GridItem, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { Icon, Icons } from '~/components/elements/icon';

const SharePricePanel = ({ _title }:any) : ReactNode => {
    const comparisonSymbols = [
        {
            name: 'XAO All Ordinaries',
            value: 'xao.asx'
        },
        {
            name: 'XJO S&P/ASX 200',
            value: 'xjo.asx'
        },
        {
            name: 'XKO S&P/ASX 300',
            value: 'xko.asx'
        }
    ];

    let selectedSymbolLabel = '';

    const scrollToHistoricPriceTable = () => {
        const scrollDiv = document.getElementById("historicalPrice").offsetTop;
        window.scrollTo({ top: scrollDiv - 120, behavior: 'smooth'});
    }

    return <ContentBlock contain={false}>
        <Box as={YourIR}>
            <Box py={12} background="lightGrey3">
                <Container>
                    <Grid templateColumns='repeat(5, 1fr)'
                          gap={8}>
                        <GridItem colSpan={2}>
                            <Box borderTop="1px solid"
                                 borderBottom="1px solid"
                                 borderColor="grey"
                                 py={4}
                                 mb={8}>
                                <Text fontSize={['24px']}
                                      lineHeight={['26px']}
                                      mb={4}>
                                    <Text as="span" fontWeight={500} data-yourir="shortName"></Text>{'\u00A0'}
                                    <Text as="span" color="steelBlue3"><span data-yourir="market"></span>:<span data-yourir="symbol"></span></Text>
                                </Text>
                                <Text fontSize={['96px']}
                                      lineHeight={['106px']}
                                      fontWeight={500}
                                      data-yourir="price showCurrency=true minDecimals=2 maxDecimals=2" />
                                <Box fontSize={['16px']}
                                     lineHeight={['30px']}
                                     fontWeight={500}
                                     sx={{
                                         '.yourir-positive': {
                                             color: 'green'
                                         },
                                         'yourir-negative': {
                                             color: 'red'
                                         }
                                     }}>
                                    <Flex align="baseline" data-yourir="changeSignCSS">
                                        <Box
                                            data-yourir="changeSignCSS"
                                            mr={1}
                                            sx={{
                                                '&.yourir-positive:before': {
                                                    color: 'green',
                                                    content: "'\\25b2'"
                                                },
                                                '&.yourir-negative:before': {
                                                    color: 'red',
                                                    content: "'\\25bc'"
                                                },
                                                '&.yourir-zero:before': { content: "'-'" }
                                            }}
                                        />
                                        <Text as="span" data-yourir="change" />
                                        {'\u00A0'}
                                        (<Text as="span" data-yourir="pctChange" />)
                                    </Flex>
                                </Box>
                            </Box>
                            <Box>
                                <label>Market Cap</label>
                                <Text fontSize={['20px']}
                                      lineHeight={['26px']}
                                      fontWeight={500}
                                      data-yourir="marketCap showCurrency=true minDecimals=2 maxDecimals=2"></Text>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="0" width="0">
                                <defs>
                                    <linearGradient id="priceGradient" gradientTransform="rotate(90)">
                                        <stop offset="0%" stopColor="#fff" />
                                        <stop offset="80%" stopColor="#fff" />
                                        <stop offset="100%" stopColor="#fff" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Box w="100%"
                                 sx={{
                                     '.yourir-chart': {
                                         padding: '40px 0',
                                         borderBottomWidth: '1px',
                                         borderStyle: 'solid',
                                         borderColor: 'lightGrey2',
                                         marginBottom: '30px'
                                     },
                                     '.yourir-chart-price-fill': {
                                         fill: `url(#priceGradient)`
                                     },
                                     '.yourir-chart-price': {
                                         stroke: 'black',
                                         strokeWidth: '1px',
                                     },
                                     '.yourir-chart-yaxis-label': {
                                         position: 'relative',
                                         top: '-10px'
                                     },
                                     '.yourir-chart-yaxis-left .yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container': {
                                         left: '0',
                                         marginRight: '0',
                                         fontSize: '12px',
                                         color: 'grey'
                                     },
                                     '.yourir-chart-xaxis-label': {
                                         fontSize: '12px',
                                         color: 'grey'
                                     },
                                     '.yourir-chart-panel-border-bottom': {
                                         display: 'none'
                                     },
                                     '.yourir-chart-tick-bottom': {
                                         display: 'none'
                                     },
                                     '.yourir-chart-xaxis-outside': {
                                         position: 'relative',
                                         top: '10px'
                                     },
                                     '.yourir-chart-yaxis-gridline': {
                                         stroke: 'lightGrey2'
                                     }
                                 }}>
                                <div id="priceComparisionChart" data-yourir="priceComparisonChart1 comparisonSymbol1=sol.asx volume.visible=false range=1d ranges=1d,1m,6m,1y,5y,10y showTooltips=true">
                                    <Flex>
                                        <Box>
                                            <ButtonGroup
                                                spacing={0}
                                                sx={
                                                    {
                                                        '.yourir-active, button:focus': {
                                                            color: 'white',
                                                            background: 'black'
                                                        }
                                                    }
                                                }>
                                                <Button data-yourir="range" variant="sharePrice" value="1d">
                                                    1D
                                                </Button>
                                                <Button data-yourir="range" variant="sharePrice" value="5d">
                                                    5D
                                                </Button>
                                                <Button data-yourir="range" variant="sharePrice" value="1m">
                                                    1M
                                                </Button>
                                                <Button data-yourir="range" variant="sharePrice" value="1y">
                                                    1Y
                                                </Button>
                                                <Button data-yourir="range" variant="sharePrice" value="5y">
                                                    5Y
                                                </Button>
                                                <Button data-yourir="range" variant="sharePrice" value="all">
                                                    Max
                                                </Button>
                                            </ButtonGroup>
                                        </Box>
                                        <Box flex={1} />
                                        <Box>
                                            <Menu>
                                                {({ isOpen }) => (
                                                    <>
                                                        <MenuButton as={Button}
                                                                    variant="sharePrice"
                                                                    rightIcon={isOpen ? <Icon icons={Icons.ChevronRight} /> : <Icon icons={Icons.ChevronDown} /> }>
                                                            {selectedSymbolLabel ? selectedSymbolLabel : 'Compare…'}
                                                        </MenuButton>
                                                        <Portal>
                                                            <MenuList>
                                                                {
                                                                    comparisonSymbols.map((item, index) => {
                                                                        return <MenuItem key={index}
                                                                                         as={Button}
                                                                                         variant="menuItemFilter"
                                                                                         onClick={() => {
                                                                                             selectedSymbolLabel = item.name;
                                                                                             set(`priceComparisionChart.comparisonSymbol2`, item.value);
                                                                                         }}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    })
                                                                }
                                                            </MenuList>
                                                        </Portal>
                                                    </>
                                                )}
                                            </Menu>
                                        </Box>
                                    </Flex>
                                    <Box data-yourir="plots" />
                                </div>
                            </Box>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>
            <Box py={12}>
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
            <Box py={12} id="historicalPrice">
                <Container>
                    <Heading as="h2" variant="h2" mb={8}>
                        Historical Prices
                    </Heading>
                    <Box data-yourir="historicalPrices pageSize=10">
                        <Box overflowX="auto">
                            <TableContainer>
                                <Table variant="sharePrice" w="100%">
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
                                <Button variant="sharePrice"
                                        data-yourir="prevPage"
                                        onClick={scrollToHistoricPriceTable}>
                                    Prev
                                </Button>
                            </Box>
                            <Box>
                                <ButtonGroup
                                    sx={{ '.yourir-active': {
                                            bg: 'ghostWhite',
                                            borderRadius: 0
                                        }}}>
                                    <Button variant="sharePrice"
                                            data-yourir="navPage1"
                                            onClick={scrollToHistoricPriceTable}>
                                    </Button>
                                    <Button variant="sharePrice"
                                            data-yourir="navPage2"
                                            onClick={scrollToHistoricPriceTable}>
                                    </Button>
                                    <Button variant="sharePrice"
                                            data-yourir="navPage3"
                                            onClick={scrollToHistoricPriceTable}>
                                    </Button>
                                    <Button variant="sharePrice"
                                            data-yourir="navPage4"
                                            onClick={scrollToHistoricPriceTable}>
                                    </Button>
                                    <Button variant="sharePrice"
                                            data-yourir="navPage5"
                                            onClick={scrollToHistoricPriceTable}>
                                    </Button>

                                </ButtonGroup>
                            </Box>
                            <Box>
                                <Button variant="sharePrice"
                                        data-yourir="nextPage"
                                        onClick={scrollToHistoricPriceTable}>
                                    Next
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Container>
            </Box>
        </Box>
    </ContentBlock>;
};

export default SharePricePanel;
