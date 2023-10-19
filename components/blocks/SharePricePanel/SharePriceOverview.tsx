import React, { ReactNode, useState, useRef } from 'react';
import { YourIR } from 'yourir-next';
import { Box, Text, Badge } from '@chakra-ui/react';

const SharePriceOverview:any = () : ReactNode => {
    const statusRef = useRef();
    const [status, setStatus] = useState('');

    return <Box>
        {
            (() => {
                if(statusRef?.current && statusRef.current?.innerHTML && status !== statusRef.current?.innerHTML) {
                    setStatus(statusRef.current.innerHTML);
                    alert('!');
                }
            })()
        }
        <Box>{status}</Box>
        <Box sx={{
            '.OPEN .chakra-badge': {
                background: 'positive'
            }
        }}>
            <Box className={status}>
                <Badge>
                    <Text as="span" data-yourir="commonStatus" ref={statusRef} />
                </Badge>
            </Box>
        </Box>
        <Box as={YourIR}>
            <Box py={4}
                 mb={8}>
                <Text fontSize={['24px']}
                      lineHeight={['20px']}
                      mb={4}>
                    <Text as="span" fontWeight={500} data-yourir="shortName"></Text>{'\u00A0'}
                    <Text as="span" color="steelBlue3"><span data-yourir="market"></span>:<span data-yourir="symbol"></span></Text>
                </Text>
                <Badge background="positive">
                    Carl
                </Badge>
                <Box sx={{
                    '.OPEN .chakra-badge': {
                        background: 'positive'
                    }
                }}>
                    <Box className={status}>
                        <Badge>
                            <Text as="span" data-yourir="commonStatus" ref={statusRef} />
                        </Badge>
                    </Box>
                </Box>
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
            <Box>
                <label>Market Cap</label>
                <Text fontSize={['20px']}
                      lineHeight={['26px']}
                      fontWeight={500}
                      data-yourir="marketCap showCurrency=true minDecimals=2 maxDecimals=2"></Text>
            </Box>
        </Box>
    </Box>
};

export default SharePriceOverview;
