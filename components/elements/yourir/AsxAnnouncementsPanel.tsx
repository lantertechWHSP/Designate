import React, { ReactNode } from 'react';
import { Box, Container, Flex, Heading, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem, Link } from '@chakra-ui/react';
import { YourIR, set } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';

const AsxAnnouncementsPanel = () : ReactNode => {
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

    const startYear = 2016;
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

    const scrollToTable = () : void => {
        const scrollDiv = document.getElementById("asx-announcements-panel").offsetTop;
        window.scrollTo({ top: scrollDiv - 120, behavior: 'smooth'});
    };

    return <Box id="asx-announcements-panel" background="lightGrey3">
        <Box as={YourIR}>
            <Container>
                <Box py={8}>
                    <ButtonGroup spacing={4}>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton as={Button}
                                                variant="menuButton"
                                                minW="200px"
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12}  /> }>
                                        {filterName}
                                    </MenuButton>
                                    <Portal>
                                        <MenuList minW="200px">
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
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12} /> }>
                                        {yearName}
                                    </MenuButton>
                                    <Portal>
                                        <MenuList minW="200px">
                                            {
                                                years.map((item, index) => {
                                                    return <MenuItem key={index}
                                                                     as={Button}
                                                                     onClick={() => {
                                                                         yearName = item.name;
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
                        <Flex direction="row" justify="space-between" align="center" py={8}>
                            <Box>
                                <Button variant="pagination"
                                        data-yourir="prevPage"
                                        leftIcon={<Icon icon={Icons.ChevronLeft} w={12} h={12} />}
                                        onClick={scrollToTable}>
                                    Prev
                                </Button>
                            </Box>
                            <Box>
                                <ButtonGroup spacing={0}
                                             sx={
                                                {
                                                    '.yourir-active': {
                                                        bg: 'white',
                                                        borderRadius: 0
                                                    },
                                                    '[disabled]': {
                                                        display: 'none'
                                                    }
                                                }
                                            }>
                                    <Button variant="pagination"
                                            data-yourir="navPage1"
                                            onClick={scrollToTable}>
                                    </Button>
                                    <Button variant="pagination"
                                            data-yourir="navPage2"
                                            onClick={scrollToTable}>
                                    </Button>
                                    <Button variant="pagination"
                                            data-yourir="navPage3"
                                            onClick={scrollToTable}>
                                    </Button>
                                    <Button variant="pagination"
                                            data-yourir="navPage4"
                                            onClick={scrollToTable}>
                                    </Button>
                                    <Button variant="pagination"
                                            data-yourir="navPage5"
                                            onClick={scrollToTable}>
                                    </Button>
                                </ButtonGroup>
                            </Box>
                            <Box>
                                <Button variant="pagination"
                                        data-yourir="nextPage"
                                        rightIcon={<Icon icon={Icons.ChevronRight} w={12} h={12} />}
                                        onClick={scrollToTable}>
                                    Next
                                </Button>
                            </Box>
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
