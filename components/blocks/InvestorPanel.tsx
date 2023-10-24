import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, Text, Flex, Badge, Divider, Link as ChakraLink } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { YourIR } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';
import { SectionLink, SectionLinkButton } from '~/components/elements/sectionLink';


interface IInvestorPanelBlock extends IBlock {
    displayHeadline?:boolean;
}

const InvestorPanelBlock:any = ({ background, displayHeadline, paddingTop, paddingBottom }:IInvestorPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            displayHeadline && <Flex align="center" mb={[4, ,8]}>
                <Heading as="h2" variant="sectionHeading">
                    Investors
                </Heading>
                <Box flex="1" />
                <SectionLinkButton href="/news">
                    Overview
                </SectionLinkButton>
            </Flex>
        }
        <Box as={YourIR}>
            <Row>
                <Column width={[ColumnWidth.Full, , , ,ColumnWidth.FiveTwelfths]} mr={[0, , , ,ColumnWidth.Twelfth]}>
                    <Flex direction="column">
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Share Price Performance
                        </Heading>
                        <Box mb={[0, ,'13px']} borderTop="1px solid" borderColor="lightGrey2" py={2}>
                            <Text fontSize={['72px']}
                                mb={0}
                                lineHeight={['80px']}
                                  letterSpacing="-2px"
                                fontWeight={500}
                                color="darkBrown"
                                data-yourir="price showCurrency=true minDecimals=2 maxDecimals=2" />
                            <Box sx={{
                                '.chakra-badge.yourir-zero': {
                                    background: 'lightGrey'
                                },
                                '.chakra-badge.yourir-positive': {
                                    background: 'positive'
                                },
                                '.chakra-badge.yourir-negative': {
                                    background: 'negative',
                                },
                                '.yourir-change .yourir-positive': {
                                    color: 'darkBrown'
                                },
                                '.yourir-change .yourir-negative': {
                                    color: 'darkBrown'
                                },
                                '.yourir-pct-symbol .yourir-positive': {
                                    color: 'darkBrown'
                                },
                                '.yourir-pct-symbol .yourir-negative': {
                                    color: 'darkBrown'
                                },
                                '.yourir-pct-change .yourir-positive': {
                                    color: 'darkBrown'
                                },
                                '.yourir-pct-change .yourir-negative': {
                                    color: 'darkBrown'
                                },
                                '.yourir-zero .percent': {
                                    display: 'none'
                                }
                            }}>
                                <Badge data-yourir="changeSignCSS" color="darkBrown">
                                    <Box as="span"
                                        data-yourir="changeSignCSS"
                                        mr={1}
                                        sx={{
                                            '&.yourir-positive:before': {
                                                color: 'darkBrown',
                                                content: "'\\2197'"
                                            },
                                            '&.yourir-negative:before': {
                                                color: 'darkBrown',
                                                content: "'\\2198'"
                                            }
                                        }}
                                    />
                                    <Text as="span" color="darkBrown" data-yourir="change maxDecimals=2" />
                                    {'\u00A0'}
                                    <Text as="span" className="percent">
                                        (<Text as="span" color="darkBrown" data-yourir="pctChange" />)
                                    </Text>
                                </Badge>
                            </Box>
                        </Box>
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="0" width="0">
                            <defs>
                                <linearGradient id="priceGradient">
                                    <stop offset="0%" stopColor="rgba(80, 81, 60, 0.05)" />
                                    <stop offset="100%" stopColor="rgba(80, 81, 60, 0.05)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <Box overflowX="clip" overflowY="visible">
                            <Box w="calc(100% + 40px)"
                                 mx="-20px"
                                 sx={{
                                     '.yourir-chart': {
                                         padding: '20px 0 0',
                                         borderBottomWidth: '1px',
                                         borderStyle: 'solid',
                                         borderColor: 'darkBrown',
                                         color: 'darkBrown'
                                     },
                                     '.yourir-chart-price-fill': {
                                         fill: `url(#priceGradient)`
                                     },
                                     '.yourir-chart-price': {
                                         stroke: 'darkBrown',
                                         strokeWidth: '2px',
                                     },
                                     '.yourir-chart-yaxis-label': {
                                         position: 'relative',
                                         top: '-10px'
                                     },
                                     '.yourir-chart-yaxis-left .yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container': {
                                         left: '20px',
                                         marginRight: '0',
                                         fontSize: '12px',
                                         color: 'darkGrey'
                                     },
                                     '.yourir-chart-xaxis': {
                                         position: 'relative',
                                         top: '-40px'
                                     },
                                     '.yourir-chart-xaxis-label': {
                                         fontSize: '12px',
                                         color: 'darkGrey'
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
                                     '.yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container:first-of-type': {
                                         display: 'none'
                                     }
                                 }}>
                                <div data-yourir="priceChart1 range=6m showTooltips=true" >
                                    <Box data-yourir="plots"  />
                                </div>
                            </Box>
                        </Box>
                        <Box flex="1" />
                        <Box pt={8}>
                            <SectionLink href="/investor-centre/share-price-information">
                                See All
                            </SectionLink>
                        </Box>
                        <Box py={8} display={['block', , , ,'none']}>
                            <Divider />
                        </Box>
                    </Flex>
                </Column>
                <Column width={[ColumnWidth.Full, , , ,ColumnWidth.Half]}>
                    <Flex direction="column">
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            ASX Announcements
                        </Heading>
                        <Box data-yourir="announcements pageSize=5" borderBottom="1px solid" borderColor="darkBrown">
                            <Box data-yourir="items">
                                <Flex role="group"
                                    borderTop="1px solid"
                                    borderColor="lightGrey2"
                                    direction="row"
                                    color="darkBrownBlur"
                                    align="center"
                                      transition="color 0.3s linear"
                                    _hover={{
                                        color: 'black'
                                    }}
                                    py={[4, ,'22px']}>
                                    <Box position="relative" top="1px">
                                        <Heading data-yourir="$cur.heading"
                                                 as="h3"
                                                 display="inline"
                                                 variant="listItem" mr={3} />
                                        <Heading data-yourir="$cur.date format='DD.MM.YY'"
                                                 as="span"
                                                 display="inline"
                                                 variant="listLabel" mr={2} />
                                    </Box>
                                    <Box flex={1} />
                                    <Box ml={2} transition="transform 0.3s linear" _groupHover={{
                                        transform: 'translateX(4px)',
                                    }}>
                                        <ChakraLink  data-yourir="linkAnnouncement fileId" cursor="pointer"
                                                     color="darkBrownBlur"
                                                     transition="color 0.3s linear"
                                                     _groupHover={{
                                                         color: 'darkBrown',
                                                     }}>
                                            <Icon icon={Icons.ChevronRight} />
                                        </ChakraLink>
                                    </Box>

                                </Flex>
                            </Box>
                        </Box>
                        <Box flex="1" />
                        <Box pt={8}>
                            <SectionLink href="investor-centre/asx-announcements">
                                See All
                            </SectionLink>
                        </Box>
                    </Flex>
                </Column>
            </Row>
        </Box>
    </ContentBlock>;
};

export default InvestorPanelBlock;
