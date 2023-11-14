import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, {Theme} from '~/components/blocks/Content';
import StackedBarChart from '~/components/elements/charts/stackedBar/StackedBarChart';
import { ITable} from '~/interfaces/util/table';
import { isFinite as _isFinite } from 'lodash';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { darkLegendColors, legendColors } from '~/components/elements/charts/colors';

interface ITableRow {
    Year:string;
    InterimDividend:number;
    FinalDividend:number;
    SpecialDividend:number;
}

interface IDividendGrowthChartBlock extends IBlock {
    title?:string;
    table:ITable<ITableRow>;
}

const DividendGrowthChart:any = ({ title, table, theme, paddingTop, paddingBottom }:IDividendGrowthChartBlock) : ReactNode => {
    const backgroundColor:string = theme === Theme.Dark ? 'olive' : 'white';
    const newLightLegendColors:string[] = [...legendColors];
    newLightLegendColors.shift();
    const colors:string[] = theme === Theme.Dark ? darkLegendColors : newLightLegendColors;
    const textColor:string = theme === Theme.Dark ? 'white' : 'charcoal';
    const chartTextColor:string = theme === Theme.Dark ? 'whiteBlur' : 'steel';
    const borderColor:string = theme === Theme.Dark ? 'whiteBlur2' : 'borderColor';
    const borderColorDark:string = theme === Theme.Dark ? 'white' : 'charcoal';

    const getValues:any = () => {
        const values:any = [];
        if(table && table.data && Array.isArray(table.data) && table.data.length > 0) {
            table.data.map((row:ITableRow) => {
                const interimDividend:number = _isFinite(+row.InterimDividend) ? +row.InterimDividend : 0;
                const finalDividend:number = _isFinite(+row.FinalDividend) ? +row.FinalDividend : 0;
                const specialDividend:number = _isFinite(+row.SpecialDividend) ? +row.SpecialDividend : 0;

                values.push({
                    label: row.Year,
                    values: [
                        {
                            key: 'InterimDividend',
                            value: interimDividend,
                        },
                        {
                            key: 'FinalDividend',
                            value: finalDividend,
                        },
                        {
                            key: 'SpecialDividend',
                            value: specialDividend
                        }
                    ]
                });
            });
        }

        return {
            groups: [{
                fill: colors[0],
                label: 'InterimDividend',
            }, {
                fill: colors[1],
                label: 'FinalDividend',
            }, {
                fill: colors[2],
                label: 'SpecialDividend'
            }],
            rows: values
        };
    };

    const [data] = useState(getValues());

    return <ContentBlock background={backgroundColor} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row align="baseline" mb={[4, ,6, 8]}>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                {
                    title && <Heading as="h2" variant="sectionHeading" mb={[3, , ,0]} color={textColor}>
                        {title}
                    </Heading>
                }
            </Column>
            {
                (Array.isArray(data?.rows) && data.rows.length > 0) && <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]} align={['flex-start', , ,'flex-end']}>
                    <Flex direction={['column', 'row']} mx={-2} mb={-2}>
                        <Flex align="center" px={2} mb={2}>
                            <Box background={colors[0]} width="10px" height="10px" borderRadius="5px" mr={2} />
                            <Text as="span" mb={0} lineHeight={1} fontSize="16px" color={textColor}>
                                Interim Dividend
                            </Text>
                        </Flex>
                        <Flex align="center" px={2} mb={2}>
                            <Box background={colors[1]} width="10px" height="10px" borderRadius="5px" mr={2} />
                            <Text as="span" mb={0} lineHeight={1} fontSize="16px" color={textColor}>
                                Final Dividend
                            </Text>
                        </Flex>
                        <Flex align="center" px={2} mb={2}>
                            <Box background={colors[2]} width="10px" height="10px" borderRadius="5px" mr={2} />
                            <Text as="span" mb={0} lineHeight={1} fontSize="16px" color={textColor}>
                                Special Dividend
                            </Text>
                        </Flex>
                    </Flex>
                </Column>
            }
        </Row>
        <StackedBarChart data={data} textColor={chartTextColor} borderColor={borderColor} borderColorDark={borderColorDark} />
    </ContentBlock>;
};

export default DividendGrowthChart;
