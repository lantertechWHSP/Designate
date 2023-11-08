import { ReactNode, useState, useEffect } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, { Theme } from '~/components/blocks/Content';
import LineChart from '~/components/elements/charts/line/LineChart';
import { DateTime } from 'luxon';
import { Heading, Flex, Box, Menu, MenuButton, Button, Portal, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { IFilter } from '~/interfaces/util/filter';
import { ITable } from '~/interfaces/util/table';
import { darkLegendColors, legendColors } from '~/components/elements/charts/colors';

interface ITrackRecordChartBlock extends IBlock {
    australianSharesTable:ITable<any>;
    internationalSharesTable:ITable<any>;
    australianListedTable:ITable<any>;
    australianBondsTable:ITable<any>;
}

interface IChartFilter extends IFilter {
    background?:string;
}

const TrackRecordChartBlock:any = ({ australianSharesTable, internationalSharesTable, australianListedTable, australianBondsTable, paddingTop, paddingBottom, theme }:ITrackRecordChartBlock) : ReactNode => {
    const backgroundColor:string = theme === Theme.Dark ? 'olive' : 'white';
    const colors:string[] = theme === Theme.Dark ? darkLegendColors : legendColors;
    const chartTextColor:string = theme === Theme.Dark ? 'whiteBlur' : 'steel';
    const fillColor:string = theme === Theme.Dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(80, 81, 60, 0.05)';
    const borderColor:string = theme === Theme.Dark ? 'whiteBlur2' : 'borderColor';
    const borderColorDark:string = theme === Theme.Dark ? 'white' : 'charcoal';

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
            background: colors[0],
        },
        {
            label: 'International Shares',
            value: 'international',
            isActive: false,
            background: colors[1],
        },
        {
            label: 'Australian Listed',
            value: 'listed',
            isActive: false,
            background: colors[2],
        },
        {
            label: 'Australian Bonds',
            value: 'bonds',
            isActive: false,
            background: colors[3],
        },
    ]);

    const [data, setData] = useState(null);

    const updateLines:any = () : void => {
        const newLines:any = [];
        newLines.push({
            data: australianShares,
            display: filters[0].isActive,
            fill: colors[0]
        });
        newLines.push({
            data: internationalShares,
            display: filters[1].isActive,
            fill: colors[1]
        });
        newLines.push({
            data: australianListed,
            display: filters[2].isActive,
            fill: colors[2]
        });
        newLines.push({
            data: australianBonds,
            display: filters[3].isActive,
            fill: colors[3]
        });

        setData({ lines: newLines });
    };

    const [hasData] = useState<boolean>((australianSharesTable.data && australianSharesTable.data.length > 0) &&
        (internationalSharesTable.data && internationalSharesTable.data.length > 0) &&
        (australianListedTable.data && australianListedTable.data.length > 0) &&
        (australianBondsTable.data && australianBondsTable.data.length > 0));

    useEffect(() => {
        if(hasData) {
            updateLines();
        }
    }, []);

    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom} background={backgroundColor}>
        <Flex justify="space-between" mb={4}>
            <Heading as="h2" variant="sectionSubheading">
                20 Year Total Shareholder Return
            </Heading>
            {
                hasData && <Box>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton as={Button}
                                    variant="menuButton"
                                    rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} h={12} w={12} /> : <Icon icon={Icons.ChevronDown} h={12} w={12}  /> }>
                                    <Flex display="inlineFlex" direction="row" alignItems="center">
                                        <Box background={theme === Theme.Dark ? 'white' : 'lightGrey'} width="8px" height="8px" borderRadius="4px" border="1px solid" borderColor={theme === Theme.Dark ? 'charcoal' : 'transparent'}  mr={2} />
                                        <Text as="span">
                                            Compare
                                        </Text>
                                    </Flex>
                                </MenuButton>
                                <Portal>
                                    <MenuList>
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
                                                    <Flex direction="row" align="center" width="100%">
                                                        <Box background={item.background} width="8px" height="8px" borderRadius="4px" border="1px solid" borderColor={theme === Theme.Dark ? 'charcoal' : 'transparent'} mr={2} />
                                                        <Flex flex="1">{item.label}</Flex>
                                                        {
                                                            item.isActive && <Box color="steel">
                                                                <Icon icon={Icons.Tick} h={12} w={12}  />
                                                            </Box>
                                                        }
                                                    </Flex>
                                                </MenuItem>;
                                            })
                                        }
                                    </MenuList>
                                </Portal>
                            </>
                        )}
                    </Menu>
                </Box>
            }
        </Flex>
        <LineChart data={data} textColor={chartTextColor} fillColor={fillColor} borderColor={borderColor} borderColorDark={borderColorDark} />
    </ContentBlock>;
};

export default TrackRecordChartBlock;
