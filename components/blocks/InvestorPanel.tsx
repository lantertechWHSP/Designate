import { ReactNode } from 'react';
import { Box, Heading, Text, Flex, SimpleGrid } from '@chakra-ui/react';
import { Link } from "~/components/elements/link";
import ContentBlock from '~/components/blocks/Content';
import { YourIR } from 'yourir-next';
import { Icon, Icons } from "~/components/elements/icon";

interface IInvestorPanelBlock {
    title?:string;
}

const InvestorPanelBlock = ({ title }:IInvestorPanelBlock) : ReactNode => {
    return <ContentBlock>
        <Flex mb={4} align="flex-end">
            <Box flex="1">
                {
                    title && <Heading variant="sectionHeading" as="h2" mb={0}>
                        {title}
                    </Heading>
                }
            </Box>
            <Box>
                <Link variant="sectionLink" href="/investor-overview">
                    <Box as="span" mr={2}>Investor Overview</Box>
                    <Icon icon={Icons.ChevronRight} w={12} h={12} />
                </Link>
            </Box>
        </Flex>
        <SimpleGrid columns={[1, 2, 2]} spacing={8}>
            <Flex direction="column">
                <Heading as="h3" variant="sectionSubheading" mb={4}>
                    Share Price Performance
                </Heading>
                <Box as={YourIR}>
                    {/*<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">*/}
                    {/*    <defs>*/}
                    {/*        <linearGradient id="mygradient" >*/}
                    {/*            <stop offset="0%" stopColor="red" />*/}
                    {/*            <stop offset="100%" stopColor="black" />*/}
                    {/*        </linearGradient>*/}
                    {/*    </defs>*/}
                    {/*</svg>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="priceGradient" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="black" />
                                <stop offset="100%" stopColor="white" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <Box>
                        <Box
                            flex={2}
                            w="100%"
                            sx={{
                                '.yourir-chart': {
                                    p: ['10px', '10px', '15px', '35px']
                                },
                                '.yourir-chart-price-fill': {
                                    fill: `url(#priceGradient)`
                                },
                                '.yourir-chart-price': {
                                    stroke: 'black',
                                    strokeWidth: '1px',
                                }
                                // '.yourir-chart': {
                                //     p: 0,
                                //     color: 'body',
                                //     fontSize: '14px',
                                //     lineHeight: '17px',
                                //     textTransform: 'uppercase'
                                // },
                                // '.yourir-chart svg': {
                                //     maxW: '100%'
                                // },
                                // '.yourir-chart-tooltip': {
                                //     background: 'white',
                                //     color: 'midnight'
                                // },
                                // '.yourir-chart-panel': {
                                //     h: '360px'
                                // },
                                // '.yourir-chart-price': {
                                //     stroke: 'primary',
                                //     strokeWidth: '2px'
                                // },
                                // '.yourir-chart-price-fill': {
                                //     fill: 'transparent'
                                // },
                                // '.yourir-chart-panel-border-bottom': {
                                //     stroke: 'transparent',
                                //     strokeWidth: '0'
                                // },
                                // '.yourir-chart-tick-bottom': {
                                //     display: 'none'
                                // },
                                // '.yourir-chart-yaxis-gridline': {
                                //     stroke: 'grey4'
                                // },
                                // '.yourir-chart-yaxis-left .yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container': {
                                //     marginRight: '10px'
                                // },
                                // '.yourir-chart-xaxis-bottom .yourir-chart-xaxis-outside .yourir-chart-xaxis-label-container': {
                                //     top: 'calc(100% + 12px)'
                                // },
                                // '.yourir-chart-tooltip-marker-halo': {
                                //     stroke: 'sunlight',
                                //     fill: 'transparent'
                                // },
                                // '.yourir-chart-tooltip-marker': {
                                //     stroke: 'sunlight',
                                //     fill: 'sunlight'
                                // }
                            }}>
                            <div data-yourir="priceChart1 range=6y ranges=6m,1y,5y,10y showTooltips=true">
                                <Box data-yourir="plots" />
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <Flex direction="column">
                <Heading as="h3" variant="sectionSubheading" mb={4}>
                    Latest ASX Announcements
                </Heading>
                <Box as={YourIR}>
                    <Box data-yourir="announcements pageSize=3">
                        <Box data-yourir="items">
                            <Flex role="group"
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  borderTop="1px solid"
                                  borderColor="baseBorder"
                                  py={[4, 4, 6]}
                                  transition="color 200ms ease"
                                  _hover={{
                                      color: 'primary'
                                  }}>
                                <Box>
                                    <Heading data-yourir="$cur.heading"
                                             as="h3"
                                             variant="listItem"
                                             mb={[0.5, 0.5, 1]} />
                                    <Text data-yourir="$cur.date format='DD/MM/YYYY'"
                                          as="small"
                                          variant="small"
                                          color="grey1"
                                    />
                                </Box>
                                <Box width="24px"
                                     height="24px"
                                     ml={4}>
                                    {/*<IconArrowRight width="24px"*/}
                                    {/*                height="24px"*/}
                                    {/*                opacity="0"*/}
                                    {/*                transition="opacity 200ms ease"*/}
                                    {/*                _groupHover={{ opacity: "1" }} />*/}
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </SimpleGrid>
    </ContentBlock>;
};

export default InvestorPanelBlock;
