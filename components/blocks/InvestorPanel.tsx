import { ReactNode} from 'react';
import { IBlock} from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Badge, Box, Divider, Flex, Heading, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from "~/components/elements/grid/grid";
import { YourIR } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';
import { SectionLink, SectionLinkButton } from '~/components/elements/sectionLink';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IInvestorPanelBlock extends IBlock {
    displayHeadline?:boolean;
}

const InvestorPanelBlock:any = ({ background, displayHeadline, paddingTop, paddingBottom }:IInvestorPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            displayHeadline && <Flex align="center" mb={[4, ,6, 8]}>
                <Heading as="h2" variant="sectionHeading">
                    <AnimateOverflow>
                        Investors
                    </AnimateOverflow>
                </Heading>
                <Box flex="1" />
                <AnimateOverflow>
                    <SectionLinkButton href="/news">
                        Overview
                    </SectionLinkButton>
                </AnimateOverflow>
            </Flex>
        }
        <Box>
            <Row>
                <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half, ColumnWidth.FiveTwelfths]} mr={[0, 0, 0, 0,ColumnWidth.Twelfth]}>
                    <Flex direction="column" flex="1">
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            <AnimateOverflow>
                                Share Price Performance
                            </AnimateOverflow>
                        </Heading>
                        <Box borderTop="1px solid" borderColor="borderColor" py={2} mb={[6]}>
                            <Box as={YourIR}>
                                <Text
                                    mb={0}
                                    fontSize={['64px', ,'72px']}
                                    lineHeight={['64px', ,'80px']}
                                    letterSpacing="-2px"
                                    fontWeight={500}
                                    color="olive"
                                    data-yourir="price showCurrency=true minDecimals=2 maxDecimals=2" />
                            </Box>
                            <Box as={YourIR}>
                                <Box sx={{
                                    '.chakra-badge.yourir-zero': {
                                        background: 'lightGrey',
                                    },
                                    '.chakra-badge.yourir-positive': {
                                        background: 'positive'
                                    },
                                    '.chakra-badge.yourir-negative': {
                                        background: 'negative',
                                    },
                                    '.yourir-change .yourir-positive': {
                                        color: 'olive'
                                    },
                                    '.yourir-change .yourir-negative': {
                                        color: 'olive'
                                    },
                                    '.yourir-pct-symbol .yourir-positive': {
                                        color: 'olive'
                                    },
                                    '.yourir-pct-symbol .yourir-negative': {
                                        color: 'olive'
                                    },
                                    '.yourir-pct-change .yourir-positive': {
                                        color: 'olive'
                                    },
                                    '.yourir-pct-change .yourir-negative': {
                                        color: 'olive'
                                    },
                                    '.yourir-pct': {
                                        display: 'none'
                                    },
                                    '.yourir-pct.yourir-positive': {
                                        display: 'inline-block',
                                        _before: {
                                            content: '"("'
                                        },
                                        _after: {
                                            content: '")"'
                                        }
                                    },
                                    '.yourir-pct.yourir-negative': {
                                        display: 'inline-block',
                                        _before: {
                                            content: '"("'
                                        },
                                        _after: {
                                            content: '")"'
                                        }
                                    },
                                    '.yourir-pct-symbol': {
                                        fontSize: 'initial'
                                    }
                                }}>
                                    <Badge data-yourir="changeSignCSS" color="olive">
                                        <Box as="span"
                                            data-yourir="changeSignCSS"
                                            mr={1}
                                            sx={{
                                                '&.yourir-positive:before': {
                                                    color: 'olive',
                                                    content: "'\\2197'"
                                                },
                                                '&.yourir-negative:before': {
                                                    color: 'olive',
                                                    content: "'\\2198'"
                                                }
                                            }}
                                        />
                                        <Text as="span" color="olive" data-yourir="change maxDecimals=2" />
                                        {'\u00A0'}
                                        <Text as="span" color="olive" data-yourir="pctChange" />
                                    </Badge>
                                </Box>
                            </Box>
                        </Box>
                        <Box flex="1">
                            <Box as={YourIR}>
                                <Box height="100%"
                                    minHeight="214px"
                                    sx={{
                                        '.yourir-chart': {
                                            padding: '0',
                                            borderBottomWidth: '1px',
                                            borderStyle: 'solid',
                                            borderColor: 'olive',
                                            color: 'olive',
                                            fontSize: '14px',
                                            height: '100%'
                                        },
                                        '.yourir-chart-panels': {
                                            height: '214px',
                                            minHeight: '100%'
                                        },
                                        '.yourir-chart-panel': {
                                            height: '214px',
                                            minHeight: '100%'
                                        },
                                        '.yourir-chart-price-fill': {
                                            fill: `rgba(80, 81, 60, 0.2)`
                                        },
                                        '.yourir-chart-price': {
                                            stroke: 'olive',
                                            strokeWidth: '2px',
                                        },
                                        '.yourir-chart-yaxis-label': {
                                            position: 'relative',
                                            top: '-10px'
                                        },
                                        '.yourir-chart-xaxis': {
                                            position: 'relative',
                                            top: '-40px'
                                        },
                                        '.yourir-chart-xaxis-label': {
                                            fontSize: '12px',
                                            color: 'steel'
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
                                        '.yourir-chart-xaxis-label-container': {
                                            marginLeft: 0,
                                            fontSize: '12px',
                                            color: 'steel',
                                        },
                                        '.yourir-chart-yaxis-label-container': {
                                            left: 0,
                                            marginRight: 0,
                                            fontSize: '12px',
                                            color: 'steel'
                                        },
                                        '.yourir-chart-yaxis-outside .yourir-chart-yaxis-label-container:first-of-type': {
                                            display: 'none'
                                        },
                                        '.yourir-chart-panel-plot-area': {
                                            padding: '0 0 0 26px'
                                        },
                                    }}>
                                    <Box height="100%" data-yourir="priceChart1 range=6m showTooltips=true" >
                                        <Box  height="100%" data-yourir="plots" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box pt={8}>
                            <AnimateOverflow>
                                <SectionLink href="/investor-centre/share-price-information">
                                    See All
                                </SectionLink>
                            </AnimateOverflow>
                        </Box>
                        <Box py={8} display={['block', , , 'none']}>
                            <Divider />
                        </Box>
                    </Flex>
                </Column>
                <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half, ColumnWidth.Half]}>
                    <Flex direction="column">
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            <AnimateOverflow>
                                ASX Announcements
                            </AnimateOverflow>
                        </Heading>
                        <Box as={YourIR}>
                            <Box data-yourir="announcements pageSize=5" borderBottom="1px solid" borderColor="olive">
                                <Box data-yourir="items">
                                    <Flex role="group"
                                        borderTop="1px solid"
                                        borderColor="borderColor"
                                        direction="row"
                                        color="oliveBlur"
                                        align="center"
                                        transition="color 0.3s linear"
                                        _hover={{
                                            color: 'charcoal'
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
                                                color="oliveBlur"
                                                transition="color 0.3s linear"
                                                _groupHover={{
                                                    color: 'olive',
                                                }}>
                                                <Icon icon={Icons.ChevronRight} />
                                            </ChakraLink>
                                        </Box>

                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                        <Box flex="1" />
                        <Box pt={8}>
                            <AnimateOverflow>
                                <SectionLink href="investor-centre/asx-announcements">
                                    See All
                                </SectionLink>
                            </AnimateOverflow>
                        </Box>
                    </Flex>
                </Column>
            </Row>
        </Box>
    </ContentBlock>;
};

export default InvestorPanelBlock;
