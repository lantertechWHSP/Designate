import React, { ReactNode } from 'react';
import { YourIR } from 'yourir-next';
import { Flex, Box, Text, Badge } from '@chakra-ui/react';
import { symbol } from '~/consts/yourir';

const SharePriceOverview:Function = () : ReactNode => {
    return <Box as={YourIR}>
        <Box py={4}
            mb={8}>
            <Text fontSize={['24px']}
                lineHeight={['26px']}
                mb={4}>
                <Text as="span" fontWeight={500} data-yourir="shortName"></Text>{'\u00A0'}
                <Text as="span" color="steelBlue3"><span data-yourir="market"></span>:<span data-yourir="symbol"></span></Text>
            </Text>
            <Badge data-yourir="marketStatus">{symbol}</Badge>
            <Text fontSize={['96px']}
                lineHeight={['106px']}
                fontWeight={500}
                data-yourir="price showCurrency=true minDecimals=2 maxDecimals=2"/>
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
                            '&.yourir-zero:before': {content: "'-'"}
                        }}
                    />
                    <Text as="span" data-yourir="change"/>
                    {'\u00A0'}
                    (<Text as="span" data-yourir="pctChange"/>)
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
    </Box>;
};

export default SharePriceOverview;
