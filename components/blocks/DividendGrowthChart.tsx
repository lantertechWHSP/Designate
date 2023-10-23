import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import StackedBarChart from '~/components/elements/charts/stackedBar/StackedBarChart';
import { ITable } from '~/interfaces/util/table';
import { isFinite as _isFinite } from 'lodash';
import { Heading } from '@chakra-ui/react';

interface ITableRow {
    Year:string;
    InterimDividend:number;
    FinalDividend:number;
    SpecialDividend:number;
}

interface IDividendGrowthChartBlock extends IBlock, ChakraProps {
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
            groups: ['InterimDividend', 'FinalDividend', 'SpecialDividend'],
            rows: values
        };
    };

    const [data] = useState(getValues());

    return <ContentBlock py={8}>
        <Heading as="h2" mb={8}>
            Continued Dividend Growth
        </Heading>
        <StackedBarChart data={data} />
    </ContentBlock>;
};

export default DividendGrowthChart;
