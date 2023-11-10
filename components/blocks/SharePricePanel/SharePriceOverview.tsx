import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { YourIR } from 'yourir-next';
import { Box, Text, Badge, Heading, Flex } from '@chakra-ui/react';

const SharePriceOverview:any = () : ReactNode => {
    const commonStatus:any = useRef();
    const [statusStyle, setStatusStyle] = useState(null);
    let interval:any;

    useEffect(() => {
        interval = setInterval(() => {
            if(commonStatus.current) {
                // @ts-ignore
                const status:string = commonStatus.current?.innerText;

                if(status === 'OPEN') {
                    setStatusStyle({
                        '.status': {
                            background: 'positive'
                        },
                        '.status-dot': {
                            background: 'positiveDot'
                        }
                    });
                }
                else if(status === 'CLOSED') {
                    setStatusStyle({
                        '.status': {
                            background: 'negative'
                        },
                        '.status-dot': {
                            background: 'negativeDot'
                        }
                    });
                }
                else {
                    setStatusStyle({
                        '.status-dot': {
                            display: 'none'
                        }
                    });
                }
            }
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <Flex sx={{
        ...statusStyle,
        '> div': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }
    }} direction="column" marginBottom={[0, , ,'40px']} height="100%">
        <Flex as={YourIR}>
            <Box mb={4} pb={[4, , ,'45px']} borderBottom="1px solid" borderColor="borderColor">
                <Heading as="h3" fontSize={['36px']}
                    lineHeight={['42px']} fontWeight={500}
                    mb={2}>
                    <Text as="span" color="olive">Soul Patts</Text>{'\u00A0'}
                    <Text as="span" color="steel">ASX:SOL</Text>
                </Heading>
                <Box>
                    <Badge className="status" mb={4}>
                        <Text as="span" data-yourir="commonStatus" ref={commonStatus} display="none" />
                        <Flex align="center" direction="row">
                            <Box w="6px" h="6px" borderRadius="3px" className="status-dot" mr="4px" />
                            <Text as="span" mb={0}>
                                <Text as="span" mb={0}>ASX</Text>{'\u00A0'}<Text as="span" data-yourir="commonStatusName"></Text>
                            </Text>
                        </Flex>
                    </Badge>
                </Box>
            </Box>
            <Box py={4} flex={1} borderBottom="1px solid" borderColor="borderColor">
                <Text fontSize={['72px']}
                    mb={0}
                    lineHeight={['80px']}
                    fontWeight={500}
                    color="olive"
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
                    <Badge data-yourir="changeSignCSS" color="olive" mb={4}>
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
                        <Text as="span" className="percent">
                            <Text as="span" color="olive" data-yourir="pctChange" />
                        </Text>
                    </Badge>
                </Box>
            </Box>
            <Box py={4} borderBottom="3px solid" borderColor="borderColor" flex={1}>
                <Text as="label" fontSize={['16px']} lineHeight={['18px']} mb={2}>Market Cap</Text>
                <Flex fontSize={['24px']}
                    lineHeight={['26px']}
                    fontWeight={500}
                    color="charcoal"
                    sx={{
                        '.yourir-magnitude-symbol': {
                            fontSize: '24px'
                        }
                    }}>
                    <Text as="span" mb={0} data-yourir="marketCap showCurrency=true minDecimals=2 maxDecimals=2"></Text>
                    {'\u00A0'}
                    <Text as="span" mb={0}>
                        (AUD)
                    </Text>
                </Flex>
            </Box>
        </Flex>
    </Flex>;
};

export default SharePriceOverview;
