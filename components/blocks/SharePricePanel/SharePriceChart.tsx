import { ReactNode } from 'react';
import { YourIR, set } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';
import { Flex, Box, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem } from '@chakra-ui/react';
import { IFilter } from '~/interfaces/util/filter';
import { legendColors } from "~/components/elements/charts/colors";

interface ISharePriceFilter extends IFilter {
    background?:string;
}

const SharePriceChart:any = () : ReactNode => {
    const comparisonSymbols:ISharePriceFilter[] = [
        {
            label: 'XAO All Ordinaries',
            value:  'relativePrice1', // Relative Price 1 is XAO (xao.asx)
            isActive: false,
            background: legendColors[1],
        },
        {
            label: 'XJO S&P/ASX 200',
            value: 'relativePrice2', // Relative Price 2 is XJO  (xjo.asx)
            isActive: false,
            background: legendColors[2],
        },
        {
            label: 'XKO S&P/ASX 300',
            value: 'relativePrice3', /// Relative Price 3 is XKO (xko.asx)
            isActive: false,
            background: legendColors[3],
        }
    ];

    return <Box as={YourIR}>
        <Box mt={[4, 8, ,16]}>
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="0" width="0">
                <defs>
                    <linearGradient id="priceGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="rgba(80, 81, 60, 0.2)" />
                        <stop offset="80%" stopColor="rgba(80, 81, 60, 0.2)" />
                        <stop offset="100%" stopColor="rgba(80, 81, 60, 0.2)" />
                    </linearGradient>
                </defs>
            </svg>
            <Box
                w="100%"
                sx={{
                    '.yourir-chart': {
                        borderStyle: 'solid',
                        borderColor: 'borderColor',
                        color: 'olive',
                        fontSize: '14px',
                        padding: '0 0 40px',
                    },
                    '.yourir-chart-panel': {
                        height: '400px'
                    },
                    '.yourir-chart-price-fill': {
                        fill: `url(#priceGradient)`
                    },
                    '.yourir-chart-price': {
                        stroke: 'olive',
                        strokeWidth: '2px',
                    },
                    '.yourir-chart-yaxis-label': {
                        position: 'relative',
                        top: '12px'
                    },
                    '.yourir-chart-yaxis-label-container:first-of-type .yourir-chart-yaxis-label': {
                        display: 'none'
                    },
                    '.yourir-chart-yaxis-left .yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container': {
                        left: '0',
                        marginRight: '0',
                        fontSize: '12px',
                        color: 'steel'
                    },
                    '.yourir-chart-xaxis-label': {
                        fontSize: '12px',
                        color: 'steel'
                    },
                    '.yourir-chart-panel-border-bottom': {
                        stroke: 'borderColor',
                        strokeWidth: '5px'
                    },
                    '.yourir-chart-tick-bottom': {
                        display: 'none'
                    },
                    '.yourir-chart-xaxis-outside': {
                        position: 'relative',
                        top: '10px'
                    },
                    '.yourir-chart-yaxis-gridline': {
                        stroke: 'borderColor'
                    },
                    '.yourir-chart-symbol-label': {
                        display: 'none'
                    },
                    '.yourir-chart-relative-price1': {
                        stroke: legendColors[1],
                    },
                    '.yourir-chart-relative-price2': {
                        stroke: legendColors[2]
                    },
                    '.yourir-chart-relative-price3': {
                        stroke: legendColors[3]
                    },
                    '.yourir-chart-panel-plot-area': {
                        padding: '0 20px 0 40px'
                    }
                }}>
                <Box id="priceComparisionChart" data-yourir="priceComparisonChart1 volume.visible=false range=1m ranges=1d,1m,6m,1y,5y,10y showTooltips=true">
                    <Flex direction={['column', ,'row']} mb={8}>
                        <Box mb={[4, ,0]}>
                            <ButtonGroup
                                spacing={0}
                                sx={
                                    {
                                        '.yourir-active, button:focus': {
                                            color: 'white',
                                            background: 'olive',
                                            borderColor: 'olive'
                                        }
                                    }
                                }>
                                <Button data-yourir="range" variant="tab" value="1d" borderTopLeftRadius="3px" borderBottomLeftRadius="3px">
                                    1D
                                </Button>
                                <Button data-yourir="range" variant="tab" value="5d">
                                    5D
                                </Button>
                                <Button data-yourir="range" variant="tab" value="1m">
                                    1M
                                </Button>
                                <Button data-yourir="range" variant="tab" value="1y">
                                    1Y
                                </Button>
                                <Button data-yourir="range" variant="tab" value="5y">
                                    5Y
                                </Button>
                                <Button data-yourir="range" variant="tab" value="all" borderTopRightRadius="3px" borderBottomRightRadius="3px">
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
                                            variant="menuButton"
                                            height="44px"
                                            boxSizing="border-box"
                                            rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                            <Flex display="inlineFlex" direction="row" alignItems="center">
                                                <Box background="lightGrey2" width="10px" height="10px" borderRadius="5px" mr={2} />
                                                <Text as="span">
                                                    Compare
                                                </Text>
                                            </Flex>
                                        </MenuButton>
                                        <Portal>
                                            <MenuList minW="200px">
                                                {
                                                    comparisonSymbols.map((item:ISharePriceFilter, index:number) => {
                                                        return <MenuItem key={index}
                                                            as={Button}
                                                            onClick={() => {
                                                                comparisonSymbols.map((symbol) => {
                                                                    let isToggled:boolean = false;
                                                                    if(symbol.value === item.value) {
                                                                        symbol.isActive = !symbol.isActive;
                                                                        isToggled = true;
                                                                    }

                                                                    if(isToggled) {
                                                                        set(`priceComparisionChart.${symbol.value}.visible`, symbol.isActive);
                                                                    }
                                                                });
                                                            }}>
                                                            <Box background={item.background} width="10px" height="10px" borderRadius="5px" mr={2} />
                                                            <Flex flex="1">{item.label}</Flex>
                                                            {
                                                                item.isActive && <Box color="steel">
                                                                    <Icon icon={Icons.Tick} h={12} w={12}  />
                                                                </Box>
                                                            }
                                                        </MenuItem>;
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
                </Box>
            </Box>
        </Box>
    </Box>;
};

export default SharePriceChart;
