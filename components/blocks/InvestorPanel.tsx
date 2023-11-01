import {ReactNode} from 'react';
import {IBlock} from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import {Badge, Box, Divider, Flex, Heading, Link as ChakraLink, Text} from '@chakra-ui/react';
import {Column, ColumnWidth, Row} from "~/components/elements/grid/grid";
import {YourIR} from 'yourir-next';
import {Icon, Icons} from '~/components/elements/icon';
import {SectionLink, SectionLinkButton} from '~/components/elements/sectionLink';


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
                <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half, ColumnWidth.FiveTwelfths]} mr={[0, 0, 0, 0,ColumnWidth.Twelfth]}>
                    <Flex direction="column">
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Share Price Performance
                        </Heading>
                        <Box mb={[0, ,'13px']} borderTop="1px solid" borderColor="borderColor" py={2}>
                            <Text
                                mb={0}
                                fontSize={['64px', ,'72px']}
                                lineHeight={['64px', ,'80px']}
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
                        <Box w="100%"
                            sx={{
                                '.yourir-chart': {
                                    padding: '20px 0 0',
                                    borderBottomWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: 'darkBrown',
                                    color: 'darkBrown',
                                    fontSize: '14px'
                                },
                                '.yourir-chart-price-fill': {
                                    fill: `rgba(80, 81, 60, 0.2)`
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
                                    left: '0',
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
                                    stroke: 'borderColor'
                                },
                                '.yourir-chart-yaxis-label-container': {
                                    fontSize: '12px',
                                    fontFamily: 'Roboto',
                                    color: 'steelBlue'
                                },
                                '.yourir-chart-xaxis-label-container': {
                                    fontSize: '12px',
                                    fontFamily: 'Roboto',
                                    color: 'steelBlue'
                                },
                                '.yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container:first-of-type': {
                                    display: 'none'
                                }
                            }}>
                            <div data-yourir="priceChart1 range=6m showTooltips=true" >
                                <Box data-yourir="plots"  />
                            </div>
                        </Box>
                        <Box flex="1" />
                        <Box pt={8}>
                            <SectionLink href="/investor-centre/share-price-information">
                                See All
                            </SectionLink>
                        </Box>
                        <Box py={8} display={['block', , , 'none']}>
                            <Divider />
                        </Box>
                    </Flex>
                </Column>
                <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half, ColumnWidth.Half]}>
                    <Flex direction="column">
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            ASX Announcements
                        </Heading>
                        <Box data-yourir="announcements pageSize=5" borderBottom="1px solid" borderColor="darkBrown">
                            <Box data-yourir="items">
                                <Flex role="group"
                                    borderTop="1px solid"
                                    borderColor="borderColor"
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
