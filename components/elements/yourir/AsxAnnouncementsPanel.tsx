import React, { ReactNode } from 'react';
import { Box, Container, Flex, Heading, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem, Link } from '@chakra-ui/react';
import { YourIR, set } from 'yourir-next';
import { Icon, Icons } from "~/components/elements/icon";

const AsxAnnouncementsPanel = ({}:any) : ReactNode => {
    const symbol = 'sol';

    const filters = [
        {
            name: 'All Document Types',
            value: 'none'
        },
        {
            name: 'Share Holder Notices',
            value: 'securityHolder'
        },
        {
            name: 'Annual Reports',
            value: 'annualReports'
        },
        {
            name: 'Periodic Reports',
            value: 'periodicReports'
        },
        {
            name: 'Dividend Notices',
            value: 'dividendNotices'
        },
        {
            name: 'Change of Director’s Address',
            value: 'companyAdministration'
        },
        {
            name: 'Price Sensitive',
            value: 'priceSensitive'
        },
        {
            name: 'Non-Procedural',
            value: 'nonProcedural'
        }
    ]

    let filterName = filters[0].name;

    const startYear = 1998;
    const currentYear = new Date().getFullYear();

    const years = [{
        value: 'none',
        name: 'All Years'
    }, ...Array.from(
        { length: currentYear - startYear + 1 },
        (v, i) => {
            return {
                value: currentYear - i,
                name: currentYear - i,
            }
        }
    )];

    let yearName = years[0].name;

    return <Box as={YourIR}>
        <Box background="lightGrey3">
            <Container>
                <Box py={8}>
                    <ButtonGroup spacing={4}>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton as={Button}
                                                variant="menuButton"
                                                minW="200px"
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronRight} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12}  /> }>
                                        {filterName}
                                    </MenuButton>
                                    <Portal>
                                        <MenuList>
                                            {
                                                filters.map((item, index) => {
                                                    return <MenuItem key={index}
                                                                     as={Button}
                                                                     onClick={() => {
                                                                         filterName = item.name;
                                                                         set(`announcements.filter`, item.value);
                                                                     }}>
                                                        {item.name}
                                                    </MenuItem>;
                                                })
                                            }
                                        </MenuList>
                                    </Portal>
                                </>
                            )}
                        </Menu>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton as={Button}
                                                variant="menuButton"
                                                minW="200px"
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronRight} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12} /> }>
                                        {yearName}
                                    </MenuButton>
                                    <Portal>
                                        <MenuList>
                                            {
                                                years.map((item, index) => {
                                                    return <MenuItem key={index}
                                                                     as={Button}
                                                                     onClick={() => {
                                                                         setYear(item);
                                                                         set(`announcements.year`, item.value);
                                                                     }}>
                                                        {item.name}
                                                    </MenuItem>;
                                                })
                                            }
                                        </MenuList>
                                    </Portal>
                                </>
                            )}
                        </Menu>
                    </ButtonGroup>

                </Box>
                <Box id={`announcements`} data-yourir={`announcements pageSize=10 symbol=${symbol}.asx`}>
                    <Box data-yourir="ifnot isEmpty">
                        <Box data-yourir="items">
                            <Box borderTop="1px solid" borderColor="lightGrey2">
                                <Flex py={4} direction={['row']}>
                                    <Heading as="h3"
                                             data-yourir="$cur.heading"
                                             flex={1}
                                             variant="listItem" />
                                    <Text data-yourir="$cur.date format='DD.MM.YYYY'"
                                          variant="listItemDate"
                                          textAlign={['left']}
                                          minWidth={['140px']}
                                          maxWidth={['140px']}
                                          mb={0} />
                                    <Flex d={['none', ,'flex']}>
                                        <Link data-yourir="viewAnnouncement">
                                            View
                                        </Link>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box>
                        <Box borderTop="1px solid" borderColor="lightGrey2" />
                        <Flex justifyContent="center" mt={[8, ,12]} mb={[4, ,16]}>
                            <ButtonGroup
                                display={['flex', ,'inline-flex']}
                                justifyContent={['space-between', ,'unset']}
                                spacing={0}
                                sx={{ '.yourir-active': {
                                        bg: 'ghostWhite',
                                        borderRadius: 0
                                    }}}>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        fontSize="16px"
                                        data-yourir="prevPage">
                                    <Text textDecoration="underline"
                                          d="inline-block"
                                          onClick={() => {
                                              window.scrollTo(0, 0);
                                          }}>
                                        Prev
                                    </Text>
                                </Button>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        data-yourir="navPage1"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}>
                                </Button>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        data-yourir="navPage2"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}>
                                </Button>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        data-yourir="navPage3"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}>
                                </Button>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        data-yourir="navPage4"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}>
                                </Button>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        data-yourir="navPage5"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}>
                                </Button>
                                <Button color="sunlight"
                                        px={[3, 4]}
                                        fontSize="16px"
                                        data-yourir="nextPage">
                                    <Text textDecoration="underline"
                                          d="inline-block"
                                          onClick={() => {
                                              window.scrollTo(0, 0);
                                          }}>
                                        Next
                                    </Text>
                                </Button>
                            </ButtonGroup>
                        </Flex>
                    </Box>
                    <Box data-yourir="if isEmpty">
                        <Text variant="caption" color="grey1">
                            No results
                        </Text>
                    </Box>
                </Box>
            </Container>
        </Box>
    </Box>
}

export default AsxAnnouncementsPanel;
