import React, { ReactNode } from 'react';
import { YourIR } from 'yourir-next';
import { Box, Text, Badge, Heading } from '@chakra-ui/react';

const SharePriceOverview:any = () : ReactNode => {
    return<Box as={YourIR}>
        <Box mb={4} pb={[4, ,8]} borderBottom="1px solid" borderColor="borderColor">
            <Heading as="h3" fontSize={['36px']}
                lineHeight={['42px']} fontWeight={500}
                mb={4}>
                <Text as="span" data-yourir="shortName"></Text>{'\u00A0'}
                <Text as="span" color="darkBrownBlur"><span data-yourir="market"></span>:<span data-yourir="symbol"></span></Text>
            </Heading>
            <Badge>
                <Text as="span" data-yourir="commonStatus" />
            </Badge>
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
            <Text as="label" fontSize={['16px']} lineHeight={['18px']}>Market Cap</Text>
            <Text fontSize={['24px']}
                lineHeight={['26px']}
                fontWeight={500}
                m={0}
                data-yourir="marketCap showCurrency=true minDecimals=2 maxDecimals=2"></Text>
        </Box>
    </Box>;
};

export default SharePriceOverview;
