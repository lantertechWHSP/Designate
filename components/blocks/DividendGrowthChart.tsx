import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import StackedBarChart from '~/components/elements/charts/stackedBar/StackedBarChart';
import { ITable} from '~/interfaces/util/table';
import { isFinite as _isFinite } from 'lodash';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';

interface ITableRow {
    Year:string;
    InterimDividend:number;
    FinalDividend:number;
    SpecialDividend:number;
}

interface IDividendGrowthChartBlock extends IBlock {
    table:ITable<ITableRow>;
}

const DividendGrowthChart:any = ({ table }:IDividendGrowthChartBlock) : ReactNode => {
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
                fill: 'rgba(255, 255, 255, 1)',
                label: 'InterimDividend',
            }, {
                fill: 'rgba(255, 255, 255, 0.5)',
                label: 'FinalDividend',
            }, {
                fill: 'rgba(255, 255, 255, 0.3)',
                label: 'SpecialDividend'
            }],
            rows: values
        };
    };

    const [data] = useState(getValues());

    return <ContentBlock background="darkBrown">
        <Row align="baseline" mb={[4, 6, ,8]}>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                <Heading as="h2" variant="sectionHeading" mb={[3, , ,0]} color="white">
                    Continued Dividend Growth
                </Heading>
            </Column>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]} align={['flex-start', , ,'flex-end']}>
                <Flex mx={-2}>
                    <Flex align="center" px={2}>
                        <Box background="rgba(255, 255, 255, 1)" width="10px" height="10px" borderRadius="5px" mr={2} />
                        <Text as="span" mb={0} lineHeight={1} color="white">
                            Latest Dividend
                        </Text>
                    </Flex>
                    <Flex align="center" px={2}>
                        <Box background="rgba(255, 255, 255, 0.5)" width="10px" height="10px" borderRadius="5px" mr={2} />
                        <Text as="span" mb={0} lineHeight={1} color="white">
                            Final Dividend
                        </Text>
                    </Flex>
                    <Flex align="center" px={2}>
                        <Box background="rgba(255, 255, 255, 0.3)" width="10px" height="10px" borderRadius="5px" mr={2} />
                        <Text as="span" mb={0} lineHeight={1} color="white">
                            Special Dividend
                        </Text>
                    </Flex>
                </Flex>
            </Column>
        </Row>
        <StackedBarChart data={data} />
    </ContentBlock>;
};

export default DividendGrowthChart;
