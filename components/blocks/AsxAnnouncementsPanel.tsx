import React, { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Box, Container, Flex, Heading, Text, ButtonGroup, Button, Menu, MenuButton, Portal, MenuList, MenuItem, Link, Alert } from '@chakra-ui/react';
import { YourIR, set } from 'yourir-next';
import { Icon, Icons } from '~/components/elements/icon';
import { symbol } from '~/consts/yourir';
import { IFilter } from '~/interfaces/util/filter';
import { SectionLinkInner } from '~/components/elements/sectionLink';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IAsxAnnouncementsPanelBlock extends IBlock {
}

const AsxAnnouncementsPanelBlock:any = ({}:IAsxAnnouncementsPanelBlock) : ReactNode => {
    const filters:IFilter[] = [
        {
            label: 'All Document Types',
            value: 'none'
        },
        {
            label: 'Share Holder Notices',
            value: 'securityHolder'
        },
        {
            label: 'Annual Reports',
            value: 'annualReports'
        },
        {
            label: 'Periodic Reports',
            value: 'periodicReports'
        },
        {
            label: 'Dividend Notices',
            value: 'dividendNotices'
        },
        {
            label: 'Change of Director’s Address',
            value: 'companyAdministration'
        },
        {
            label: 'Price Sensitive',
            value: 'priceSensitive'
        },
        {
            label: 'Non-Procedural',
            value: 'nonProcedural'
        }
    ];

    let filterName:string = filters[0].label;

    const startYear:number = 2016;
    const currentYear:number = new Date().getFullYear();

    const years:IFilter[] = [{
        value: 'none',
        label: 'All Years'
    }, ...Array.from(
        { length: currentYear - startYear + 1 },
        (v, i) => {
            return {
                label: (currentYear - i).toString(),
                value: currentYear - i,
            };
        }
    )];

    let yearName:string = years[0].label;

    const scrollToTable:any = () : void => {
        const scrollDiv:number = document.getElementById("asx-announcements-panel").offsetTop;
        window.scrollTo({ top: scrollDiv - 160, behavior: 'smooth'});
    };

    return <Box id="asx-announcements-panel" background="ghostWhite" pb={['120px']}>
        <Box as={YourIR}>
            <Container>
                <Box py={[4, 6, , 8]}>
                    <Flex direction={['column', 'row']} mx={-2} mb={-4}>
                        <Box px={2} mb={4}>
                            <AnimateOverflow>
                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton as={Button}
                                                minWidth={['100%', '220px', , '270px']}
                                                variant="menuButton"
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12}  /> }>
                                                {filterName}
                                            </MenuButton>
                                            <Portal>
                                                <MenuList>
                                                    {
                                                        filters.map((item:IFilter, index:number) => {
                                                            return <MenuItem key={index}
                                                                as={Button}
                                                                onClick={() => {
                                                                    filterName = item.label;
                                                                    set(`announcements.filter`, item.value);
                                                                }}>
                                                                {item.label}
                                                            </MenuItem>;
                                                        })
                                                    }
                                                </MenuList>
                                            </Portal>
                                        </>
                                    )}
                                </Menu>
                            </AnimateOverflow>
                        </Box>
                        <Box px={2} mb={4}>
                            <AnimateOverflow>
                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton as={Button}
                                                variant="menuButton"
                                                minWidth={['100%', ,'150px']}
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12} /> }>
                                                {yearName}
                                            </MenuButton>
                                            <Portal>
                                                <MenuList>
                                                    {
                                                        years.map((item, index) => {
                                                            return <MenuItem key={index}
                                                                as={Button}
                                                                onClick={() => {
                                                                    yearName = item.label;
                                                                    set(`announcements.year`, item.value);
                                                                }}>
                                                                {item.label}
                                                            </MenuItem>;
                                                        })
                                                    }
                                                </MenuList>
                                            </Portal>
                                        </>
                                    )}
                                </Menu>
                            </AnimateOverflow>
                        </Box>
                    </Flex>
                </Box>
                <Box id={`announcements`} data-yourir={`announcements pageSize=10 symbol=${symbol}.asx`}>
                    <Box data-yourir="ifnot isEmpty">
                        <Box data-yourir="items" borderTop="1px solid" borderColor="borderColor">
                            <Box borderTop="1px solid" borderColor="borderColor">
                                <Flex py={4} direction="row" align="center">
                                    <Heading as="h3"
                                        data-yourir="$cur.heading"
                                        flex={1}
                                        mr={2}
                                        variant="listItem" />
                                    <Text data-yourir="$cur.date format='MMM DD, YYYY'"
                                        width={['33%', ,'25%']}
                                        variant="listLabel"
                                        textAlign={['right', ,'left']}
                                        mb={0} />
                                    <Flex width={['8.33333333333%']}
                                        justify="flex-end"
                                        display={['none', ,'flex']}>
                                        <Link data-yourir="viewAnnouncementOnMobile {$cur.symbol} {$cur.fileID}">
                                            <SectionLinkInner>
                                                View
                                            </SectionLinkInner>
                                        </Link>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box>
                        <Box borderTop="1px solid" borderColor="borderColor" />
                        <Flex direction="row" justify="space-between" align="center" py={8}>
                            <Box>
                                <Button variant="paginationDirection"
                                    data-yourir="prevPage"
                                    m={0}
                                    onClick={scrollToTable}>
                                    <Flex align="center"
                                        display="inline-flex"
                                        borderBottom="1px solid"
                                        borderColor="oliveBlur2"
                                        fontWeight={700}>
                                        <Icon icon={Icons.ChevronLeft} w={12} h={12} />
                                        <Text as="span" ml={2}>
                                            Prev
                                        </Text>
                                    </Flex>
                                </Button>
                            </Box>
                            <Box>
                                <ButtonGroup spacing={0}
                                    sx={
                                        {
                                            '.yourir-active': {
                                                background: 'olive',
                                                color: 'white',
                                                borderRadius: '50%'
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
                                <Button variant="paginationDirection"
                                    data-yourir="nextPage"
                                    m={0}
                                    onClick={scrollToTable}>
                                    <Flex align="center"
                                        display="inline-flex"
                                        borderBottom="2px solid"
                                        borderColor="oliveBlur2"
                                        transition="border-color 0.3s linear"
                                        _hover={{
                                            borderColor: 'olive'
                                        }}
                                        fontWeight={700}>
                                        <Text as="span" mr={2}>
                                            Next
                                        </Text>
                                        <Icon icon={Icons.ChevronRight} w={12} h={12} />
                                    </Flex>
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                    <Box data-yourir="if isEmpty">
                        <Alert status="info">
                            No results
                        </Alert>
                    </Box>
                </Box>
            </Container>
        </Box>
    </Box>;
};

export default AsxAnnouncementsPanelBlock;
