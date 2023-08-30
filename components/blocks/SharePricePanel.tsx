import { ReactNode, useState } from 'react';
import { YourIR, set } from 'yourir-next';
import { Flex, Box, Grid, GridItem, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem  } from '@chakra-ui/react';
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

    let [selectedSymbol, setSelectedSymbol] = useState(null);

    return <ContentBlock py={12} background="lightGrey3">
        <Box onClick={() => {
            setSelectedSymbol({
                name: 'Carl',
                value: 'reign'
            })
        }}>

            Carl
        </Box>
        {selectedSymbol?.name}

        <Box as={YourIR}>
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
                                        <Button data-yourir="range" variant="sharePriceChart" value="1d">
                                            1D
                                        </Button>
                                        <Button data-yourir="range" variant="sharePriceChart" value="5d">
                                            5D
                                        </Button>
                                        <Button data-yourir="range" variant="sharePriceChart" value="1m">
                                            1M
                                        </Button>
                                        <Button data-yourir="range" variant="sharePriceChart" value="1y">
                                            1Y
                                        </Button>
                                        <Button data-yourir="range" variant="sharePriceChart" value="5y">
                                            5Y
                                        </Button>
                                        <Button data-yourir="range" variant="sharePriceChart" value="all">
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
                                                            variant="menuFilter"
                                                            rightIcon={isOpen ? <Icon icon={Icons.ChevronRight} /> : <Icon icon={Icons.ChevronDown} /> }>
                                                    {selectedSymbol?.name}
                                                    {isOpen ? 'Close' : 'Open'}
                                                </MenuButton>
                                                <Portal>
                                                    <MenuList>
                                                        {
                                                            comparisonSymbols.map((item, index) => {
                                                                return <MenuItem key={index}
                                                                                 as={Button}
                                                                                 variant="menuItemFilter"
                                                                                 onClick={() => {
                                                                                     console.log(item);
                                                                                     setSelectedSymbol(item)
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
        </Box>
    </ContentBlock>;
};

export default SharePricePanel;
