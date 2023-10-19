import { ReactNode } from 'react';
import { YourIR, set } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';
import { Flex, Box, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem } from '@chakra-ui/react';
import { IFilter } from '~/interfaces/util/filter';
import { colors } from "~/components/elements/charts/colors";

interface ISharePriceFilter extends IFilter {
    background?:string;
}

const SharePriceChart:any = () : ReactNode => {
    const comparisonSymbols:ISharePriceFilter[] = [
        {
            label: 'XAO All Ordinaries',
            value:  'relativePrice1', // Relative Price 1 is XAO (xao.asx)
            isActive: false,
            background: colors[1],
        },
        {
            label: 'XJO S&P/ASX 200',
            value: 'relativePrice2', // Relative Price 2 is XJO  (xjo.asx)
            isActive: false,
            background: colors[2],
        },
        {
            label: 'XKO S&P/ASX 300',
            value: 'relativePrice3', /// Relative Price 3 is XKO (xko.asx)
            isActive: false,
            background: colors[3],
        }
    ];

    return <Box as={YourIR}>
        <Box mt={[8, ,16]}>
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="0" width="0">
                <defs>
                    <linearGradient id="priceGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="rgba(80, 81, 60, 0.2)" />
                        <stop offset="80%" stopColor="rgba(80, 81, 60, 0.2)" />
                        <stop offset="100%" stopColor="rgba(80, 81, 60, 0.2)" />
                    </linearGradient>
                </defs>
            </svg>
            <Box w="100%"
                sx={{
                    '.yourir-chart': {
                        padding: '40px 0',
                        borderBottomWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'lightGrey2'
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
                        color: 'darkBrown'
                    },
                    '.yourir-chart-xaxis-label': {
                        fontSize: '12px',
                        color: 'darkBrown'
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
                    },
                    '.yourir-chart-symbol-label': {
                        display: 'none'
                    },
                    '.yourir-chart-relative-price1': {
                        stroke: colors[1],
                    },
                    '.yourir-chart-relative-price2': {
                        stroke: colors[2]
                    },
                    '.yourir-chart-relative-price3': {
                        stroke: colors[3]
                    }
                }}>
                <Box id="priceComparisionChart" data-yourir="priceComparisonChart1 volume.visible=false range=1m ranges=1d,1m,6m,1y,5y,10y showTooltips=true">
                    <Flex direction={['column', ,'row']}>
                        <Box>
                            <ButtonGroup
                                spacing={0}
                                sx={
                                    {
                                        '.yourir-active, button:focus': {
                                            color: 'white',
                                            background: 'darkBrown',
                                            borderColor: 'darkBrown'
                                        }
                                    }
                                }>
                                <Button data-yourir="range" variant="tab" value="1d">
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
                                <Button data-yourir="range" variant="tab" value="all">
                                    Max
                                </Button>
                            </ButtonGroup>
                        </Box>
                        <Box flex={1} />
                        <Box mt={[4, ,0]}>
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton as={Button}
                                            variant="menuButton"
                                            rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                            <Flex display="inlineFlex" direction="row" alignItems="center">
                                                <Box background="lightGrey2" width="10px" height="10px" borderRadius="5px" mr={2} />
                                                <Text as="span">
                                                    Compare…
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
                                                            <Text as="span">{item.label}</Text>
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
