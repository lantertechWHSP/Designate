import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { YourIR } from 'yourir-next';
import { Box, Text, Badge, Heading, Flex } from '@chakra-ui/react';

const SharePriceOverview:any = () : ReactNode => {
    const commonStatus = useRef();
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

    return <Box sx={statusStyle}>
        <Box as={YourIR}>
            <Box mb={4} pb={[4, ,8]} borderBottom="1px solid" borderColor="borderColor">
                <Heading as="h3" fontSize={['36px']}
                    lineHeight={['42px']} fontWeight={500}
                    mb={4}>
                    <Text as="span" color="darkBrown" data-yourir="shortName"></Text>{'\u00A0'}
                    <Text as="span" color="steelBlue"><span data-yourir="market"></span>:<span data-yourir="symbol"></span></Text>
                </Heading>
                <Box>
                    <Badge className="status">
                        <Text as="span" data-yourir="commonStatus" ref={commonStatus} display="none" />
                        <Flex align="center" direction="row">
                            <Box w="6px" h="6px" borderRadius="3px" className="status-dot" mr="4px" />
                            <Text as="span" data-yourir="commonStatusName"></Text>
                        </Flex>
                    </Badge>
                </Box>
            </Box>
            <Box pb={[4, ,20]} borderBottom="1px solid" borderColor="borderColor">
                <Text fontSize={['72px']}
                    mb={0}
                    lineHeight={['80px']}
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
            <Box py={4} borderBottom="1px solid" borderColor="borderColor">
                <Text as="label" fontSize={['16px']} lineHeight={['18px']} mb={2}>Market Cap</Text>
                <Text fontSize={['24px']}
                    lineHeight={['26px']}
                    fontWeight={500}
                    mb={4}
                    color="black"
                    data-yourir="marketCap showCurrency=true minDecimals=2 maxDecimals=2"></Text>
            </Box>
        </Box>
    </Box>;
};

export default SharePriceOverview;
