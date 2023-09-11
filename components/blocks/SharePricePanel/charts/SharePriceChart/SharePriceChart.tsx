import { ReactNode } from 'react';
import { YourIR, set } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';
import { Flex, Box, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem } from '@chakra-ui/react';
import { IFilter } from '~/interfaces/util/filter';
import { ColorGenerator } from "~/lib/colorGenerator/colorGenerator";

const SharePriceChart:any = () : ReactNode => {
    const comparisonSymbols:IFilter[] = [
        {
            label: 'XAO All Ordinaries',
            value:  'relativePrice1', // Relative Price 1 is XAO (xao.asx)
            isActive: false
        },
        {
            label: 'XJO S&P/ASX 200',
            value: 'relativePrice2', // Relative Price 2 is XJO  (xjo.asx)
            isActive: false
        },
        {
            label: 'XKO S&P/ASX 300',
            value: 'relativePrice3', /// Relative Price 3 is XKO (xko.asx)
            isActive: false
        }
    ];

    const predefinedColors:any = new ColorGenerator().getPredefinedColors();

    return <Box as={YourIR} id="blah">
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
                },
                '.yourir-chart-symbol-label': {
                    display: 'none'
                },
                '.yourir-chart-relative-price1': {
                    stroke: predefinedColors.blue,
                },
                '.yourir-chart-relative-price2': {
                    stroke: predefinedColors.red
                },
                '.yourir-chart-relative-price3': {
                    stroke: predefinedColors.green
                }
            }}>
            <Box id="priceComparisionChart" data-yourir="priceComparisonChart1 volume.visible=false range=1m ranges=1d,1m,6m,1y,5y,10y showTooltips=true">
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
                    <Box>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton as={Button}
                                        variant="menuButton"
                                        height="40px"
                                        lineHeight="40px"
                                        rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                        Compare…
                                    </MenuButton>
                                    <Portal>
                                        <MenuList>
                                            {
                                                comparisonSymbols.map((item:IFilter, index:number) => {
                                                    return <MenuItem key={index}
                                                        as={Button}
                                                        variant="menuItemFilter"
                                                        style={{
                                                            background: item.isActive ? 'black' : '',
                                                            color: item.isActive ? 'white' : ''
                                                        }}
                                                        onClick={() => {
                                                            comparisonSymbols.map((symbol) => {
                                                                let isToggled = false;
                                                                if(symbol.value === item.value) {
                                                                    symbol.isActive = !symbol.isActive;
                                                                    isToggled = true;
                                                                }

                                                                debugger;

                                                                if(isToggled) {
                                                                    set(`priceComparisionChart.${symbol.value}.visible`, symbol.isActive);
                                                                }
                                                            });
                                                        }}>
                                                        {item.label}
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
    </Box>;
};

export default SharePriceChart;
