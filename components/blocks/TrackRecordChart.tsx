import { ReactNode, useState, useEffect } from 'react';
import ContentBlock from '~/components/blocks/Content';
import LineChart from '~/components/elements/charts/line/LineChart';
import { DateTime } from 'luxon';
import { Heading, Flex, Box, Menu, MenuButton, Button, Portal, MenuList, MenuItem } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { IFilter } from '~/interfaces/util/filter';
import { IDatoTable } from '~/interfaces/util/table';

interface ITrackRecordChartBlockProps {
    australianSharesTable:IDatoTable<any>;
    internationalSharesTable:IDatoTable<any>;
    australianListedTable:IDatoTable<any>;
    australianBondsTable:IDatoTable<any>;
}

const TrackRecordChartBlock:any = ({ australianSharesTable, internationalSharesTable, australianListedTable, australianBondsTable }:ITrackRecordChartBlockProps) : ReactNode => {
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

    const [filters, setFilters] = useState<IFilter[]>([
        {
            label: 'Australian Shares',
            value: 'australian',
            isActive: true,
        },
        {
            label: 'International Shares',
            value: 'international',
            isActive: false,
        },
        {
            label: 'Australian Listed',
            value: 'listed',
            isActive: false,
        },
        {
            label: 'Australian Bonds',
            value: 'bonds',
            isActive: false,
        },
    ]);

    const [lines, setLines] = useState([]);

    const updateLines:any = () : void => {
        const newLines:any = [];
        newLines.push({
            data: australianShares,
            display: filters[0].isActive,
        });
        newLines.push({
            data: internationalShares,
            display: filters[1].isActive,
        });
        newLines.push({
            data: australianListed,
            display: filters[2].isActive,
        });
        newLines.push({
            data: australianBonds,
            display: filters[3].isActive
        });

        setLines(newLines);
    };

    useEffect(() => {
        updateLines();
    }, []);

    return <ContentBlock py={8}>
        <Flex justify="space-between">
            <Heading as="h2">
                20 Year Total Shareholder Return
            </Heading>
            <Box>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton as={Button}
                                variant="menuButton"
                                minW="200px"
                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12}  /> }>
                                Compare
                            </MenuButton>
                            <Portal>
                                <MenuList minW="200px">
                                    {
                                        filters.map((item:IFilter, index:number) => {
                                            return <MenuItem key={index}
                                                as={Button}
                                                variant="menuItemFilter"
                                                style={{
                                                    background: item.isActive ? 'black' : '',
                                                    color: item.isActive ? 'white' : ''
                                                }}
                                                onClick={() => {
                                                    let isToggled:boolean = false;

                                                    const newFilters:IFilter[] = [...filters];

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
                                                {item.label}
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
        <LineChart lines={lines} />
    </ContentBlock>;
};

export default TrackRecordChartBlock;
