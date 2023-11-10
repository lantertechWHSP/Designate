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

interface ITableRow {
    Date:string;
    SOL:string; // SOL shares
    AllOrds:string; // All Ords Accumulation
    MSCIWorld:string; // MSCI World ex Aus
    Property?:string; // A-REIT Total Return
    Bonds?:string; // Bloomberg AusBond Composite
}

interface ITrackRecordChartBlock extends IBlock {
    table: ITable<ITableRow>;
}

interface IChartFilter extends IFilter {
    background?:string;
}

const TrackRecordChartBlock:any = ({ table, theme, paddingTop, paddingBottom }:ITrackRecordChartBlock) : ReactNode => {
    const backgroundColor:string = theme === Theme.Dark ? 'olive' : 'white';
    const colors:string[] = theme === Theme.Dark ? darkLegendColors : legendColors;
    const headingTextColor:string = theme === Theme.Dark ? 'white' : 'charcoal';
    const chartTextColor:string = theme === Theme.Dark ? 'whiteBlur' : 'steel';
    const fillColor:string = theme === Theme.Dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(80, 81, 60, 0.05)';
    const borderColor:string = theme === Theme.Dark ? 'whiteBlur2' : 'borderColor';
    const borderColorDark:string = theme === Theme.Dark ? 'white' : 'charcoal';

    const parseValue:any = (value:String) : number => {
        return parseFloat(value.replace(/,/g, ''));
    };

    const parseDate:any = (value:string) : DateTime => {
        return DateTime.fromFormat(value, 'd/M/yyyy');
    };

    const SOLData:any[] = [];
    const AllOrdsData:any[] = [];
    const MSCIWorldData:any[] = [];
    const PropertyData:any[] = [];
    const BondsData:any[] = [];

    table.data.map((row:ITableRow) => {
        SOLData.push({
            value: parseValue(row.SOL),
            date: parseDate(row.Date)
        });

        AllOrdsData.push({
            value: parseValue(row.AllOrds),
            date: parseDate(row.Date)
        });

        MSCIWorldData.push({
            value: parseValue(row.MSCIWorld),
            date: parseDate(row.Date)
        });

        PropertyData.push({
            value: parseValue(row.Property),
            date: parseDate(row.Date)
        });

        BondsData.push({
            value: parseValue(row.Bonds),
            date: parseDate(row.Date)
        });
    });

    const [filters, setFilters] = useState<IChartFilter[]>([
        {
            label: 'SOL shares',
            value: 'sol',
            isActive: true,
            background: colors[0],
        },
        {
            label: 'All Ords Accumulation',
            value: 'allOrds',
            isActive: false,
            background: colors[1],
        },
        {
            label: 'MSCI World ex Aus',
            value: 'msci',
            isActive: false,
            background: colors[2],
        },
        {
            label: 'A-REIT Total Return',
            value: 'property',
            isActive: false,
            background: colors[3],
        },
        {
            label: 'Bloomberg AusBond Composite',
            value: 'bonds',
            isActive: false,
            background: 'red',
        },
    ]);

    const [data, setData] = useState(null);

    const updateLines:any = () : void => {
        const newLines:any = [];

        newLines.push({
            data: SOLData,
            display: filters[0].isActive,
            fill: colors[0]
        });

        newLines.push({
            data: AllOrdsData,
            display: filters[1].isActive,
            fill: colors[1]
        });

        newLines.push({
            data: MSCIWorldData,
            display: filters[2].isActive,
            fill: colors[2]
        });

        newLines.push({
            data: PropertyData,
            display: filters[3].isActive,
            fill: colors[3]
        });

        newLines.push({
            data: BondsData,
            display: filters[4].isActive,
            fill: 'red'
        });

        setData({ lines: newLines });
    };

    const [hasData] = useState<boolean>((SOLData && SOLData.length > 0) &&
        (AllOrdsData && AllOrdsData.length > 0) &&
        (MSCIWorldData && MSCIWorldData.length > 0) &&
        (PropertyData && PropertyData.length > 0) &&
        (BondsData && BondsData.length > 0)
    );

    useEffect(() => {
        if(hasData) {
            updateLines();
        }
    }, []);


    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom} background={backgroundColor}>
        <Flex justify="space-between" align="center" mb={['']}>
            <Heading as="h2" variant="sectionSubheading" color={headingTextColor}>
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
