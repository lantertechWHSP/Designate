import { ReactNode, useState } from 'react';
import ContentBlock from '~/components/blocks/Content';
import StackedBarChart from '~/components/elements/charts/stackedBar/StackedBarChart';
import { ITable } from '~/interfaces/util/table';
import { isFinite as _isFinite } from 'lodash';

interface ITableRow {
    Year:string;
    InterimDividend:number;
    FinalDividend:number;
    SpecialDividend:number;
}

interface IDividendGrowthChart {
    table:ITable<ITableRow>;
}

const DividendGrowthChart:any = ({ table }:IDividendGrowthChart) : ReactNode => {
    const getValues:any = () => {
        const values:any = [];
        if(table && table.data && Array.isArray(table.data) && table.data.length > 0) {
            table.data.map((row:ITableRow) => {
                const interimDividend:number = _isFinite(+row.InterimDividend) ? +row.InterimDividend : 0;
                const finalDividend:number = _isFinite(+row.FinalDividend) ? +row.FinalDividend : 0;
                const specialDividend:number = _isFinite(+row.SpecialDividend) ? +row.SpecialDividend : 0;

                values.push({
                    label: row.Year,
                    values: [interimDividend, finalDividend, specialDividend]
                })
            })
        }

        return values;
    }

    const [stackedBar] = useState(getValues());

    return <ContentBlock py={8}>
        <StackedBarChart stackedBar={stackedBar} />
    </ContentBlock>
}

export default DividendGrowthChart;
