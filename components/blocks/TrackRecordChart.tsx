import { ReactNode, useState, useEffect } from 'react';
import ContentBlock from '~/components/blocks/Content';
import LineChart from '~/components/elements/charts/line/LineChart';
import { DateTime } from 'luxon';
import { Heading, Flex, Box, Menu, MenuButton, Button, Portal, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { IFilter } from '~/interfaces/util/filter';
import { ITable } from '~/interfaces/util/table';

interface ITrackRecordChartBlock {
    australianSharesTable:ITable<any>;
    internationalSharesTable:ITable<any>;
    australianListedTable:ITable<any>;
    australianBondsTable:ITable<any>;
}

interface IChartFilter extends IFilter {
    background?:string;
}

const TrackRecordChartBlock:any = ({ australianSharesTable, internationalSharesTable, australianListedTable, australianBondsTable }:ITrackRecordChartBlock) : ReactNode => {
    const australianShares:any = australianSharesTable.data.map((datum) => {
        return {
            value: +datum.Value,
            date: DateTime.fromFormat(datum.Date, 'd/M/yyyy')
        };
    });

    const internationalShares:any = internationalSharesTable.data.map((datum) => {
        return {
            value: +datum.Value,
            date: DateTime.fromFormat(datum.Date, 'd/M/yyyy')
        };
    });

    const australianListed:any = australianListedTable.data.map((datum) => {
        return {
            value: +datum.Value,
            date: DateTime.fromFormat(datum.Date, 'd/M/yyyy')
        };
    });

    const australianBonds:any = australianBondsTable.data.map((datum) => {
        return {
            value: +datum.Value,
            date: DateTime.fromFormat(datum.Date, 'd/M/yyyy')
        };
    });

    const [filters, setFilters] = useState<IChartFilter[]>([
        {
            label: 'Australian Shares',
            value: 'australian',
            isActive: true,
            background: '#848484'
        },
        {
            label: 'International Shares',
            value: 'international',
            isActive: false,
            background: '#E5A635'
        },
        {
            label: 'Australian Listed',
            value: 'listed',
            isActive: false,
            background: '#93B24A'
        },
        {
            label: 'Australian Bonds',
            value: 'bonds',
            isActive: false,
            background: '#673148'
        },
    ]);

    const [lines, setLines] = useState([]);

    const updateLines:any = () : void => {
        const newLines:any = [];
        newLines.push({
            data: australianShares,
            display: filters[0].isActive,
            fill: '#848484'
        });
        newLines.push({
            data: internationalShares,
            display: filters[1].isActive,
            fill: '#E5A635'
        });
        newLines.push({
            data: australianListed,
            display: filters[2].isActive,
            fill: '#93B24A'
        });
        newLines.push({
            data: australianBonds,
            display: filters[3].isActive,
            fill: '#673148'
        });

        setLines(newLines);
    };

    useEffect(() => {
        updateLines();
    }, []);

    return <ContentBlock py={[6, 8, 12]}>
        <Flex justify="space-between">
            <Heading as="h2" variant="sectionSubheading">
                20 Year Total Shareholder Return
            </Heading>
            <Box>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton as={Button}
                                variant="menuButton"
                                minW="270px"
                                        color="darkGrey"
                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12}  /> }>
                                Compare
                            </MenuButton>
                            <Portal>
                                <MenuList minW="270px">
                                    {
                                        filters.map((item:IChartFilter, index:number) => {
                                            return <MenuItem key={index}
                                                as={Button}
                                                variant="menuItemFilter"
                                                             isActive={item.isActive}
                                                onClick={() => {
                                                    let isToggled:boolean = false;

                                                    const newFilters:IChartFilter[] = [...filters];

                                                    newFilters.map((innerFilter) => {
                                                        if(innerFilter.value === item.value) {
                                                            innerFilter.isActive = !innerFilter.isActive;

                                                            isToggled = true;
                                                        }
                                                    });

                                                    if(isToggled) {
                                                        setFilters(newFilters);
                                                        updateLines();
                                                    }
                                                }}>
                                                <Box background={item.background} width="10px" height="10px" borderRadius="5px" mr={2} />
                                                <Text as="span">{item.label}</Text>
                                            </MenuItem>;
                                        })
                                    }
                                </MenuList>
                            </Portal>
                        </>
                    )}
                </Menu>
            </Box>
        </Flex>
        <LineChart data={{ lines: lines }} />
    </ContentBlock>;
};

export default TrackRecordChartBlock;
