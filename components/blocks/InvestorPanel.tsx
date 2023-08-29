import { ReactNode } from 'react';
import { Box, Heading, Text, Flex, SimpleGrid, Divider } from '@chakra-ui/react';
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
        <Box as={YourIR}>
            <SimpleGrid columns={[1, 2, 2]} spacing={8}>
                <Flex direction="column">
                    <Heading as="h3" variant="sectionSubheading" mb={4}>
                        Share Price Performance
                    </Heading>
                    <span>
                        <Text as="span" fontWeight={500} data-yourir="shortName"></Text>
                        {'\u00A0'}
                        <Text as="span" color="steelBlue3">
                            <span data-yourir="market"></span>:<span data-yourir="symbol"></span>
                        </Text>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="0" width="0">
                        <defs>
                            <linearGradient id="priceGradient" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="black" />
                                <stop offset="100%" stopColor="white" />
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
                                 right: 'calc(100% - 20px)',
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
                        <div data-yourir="priceChart1 range=6y ranges=6m,1y,5y,10y showTooltips=true">
                            <Box data-yourir="plots" />
                        </div>
                    </Box>
                    <SimpleGrid columns={[1, 1, 2]}>
                        <Box>
                            <label>Price</label>
                            <Heading fontSize={['48px']}
                                     lineHeight={['48px']}
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
                    </SimpleGrid>
                    <Divider />
                    <Box flex="1" />
                    <Box py={8}>
                        <Link variant="sectionLink" href="#">
                            <Box as="span" mr={2}>See All</Box>
                            <Icon icon={Icons.ChevronRight} w={12} h={12} />
                        </Link>
                    </Box>
                </Flex>
                <Flex direction="column">
                    <Heading as="h3" variant="sectionSubheading" mb={4}>
                        Latest ASX Announcements
                    </Heading>
                    <Box data-yourir="announcements pageSize=3">
                        <Box data-yourir="items">
                            <Box borderTop="1px solid"
                                 borderColor="grey"
                                 py={[4, 4, 6]}>
                                <Heading data-yourir="$cur.date format='DD/MM/YYYY'"
                                         as="span"
                                         variant="label" />
                                <Heading data-yourir="$cur.heading"
                                         as="h3"
                                         variant="listItem"
                                         mb={[4, 4, 6]} />
                                <Link variant="sectionLink" href="#" color="black">
                                    <Box as="span" mr={2}>Read</Box>
                                    <Icon icon={Icons.ChevronRight} w={12} h={12} />
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box flex="1" />
                    <Box py={8}>
                        <Link variant="sectionLink" href="#">
                            <Box as="span" mr={2}>See All</Box>
                            <Icon icon={Icons.ChevronRight} w={12} h={12} />
                        </Link>
                    </Box>
                </Flex>
            </SimpleGrid>
        </Box>
    </ContentBlock>;
};

export default InvestorPanelBlock;
