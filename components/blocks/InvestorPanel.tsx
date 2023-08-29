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
                    <Box>
                        <Heading as="h4" mb={0} data-yourir="price showCurrency=false minDecimals=2 maxDecimals=2" />
                    </Box>
                    <Flex direction="column"
                          height="100%"
                          justifyContent="space-between">
                        <Text as="small" variant="small"
                              position="relative"
                              top="26px">
                            $AUD
                        </Text>
                        <Box position="relative"
                             top={['-22px', '-22px', '-10px']}>
                            <Flex textStyle="label">
                                <Box
                                    data-yourir="changeSignCSS"
                                    mr={3}
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
                                <Heading as="span"
                                         data-yourir="pctChange"
                                         sx={{
                                             '.yourir-pct': {
                                                 color: 'dark',
                                                 fontSize: ['24px', ,'36px'],
                                                 lineHeight: ['28px', ,'42px'],
                                                 fontWeight: 500
                                             }
                                         }}
                                />
                            </Flex>
                        </Box>
                    </Flex>
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
