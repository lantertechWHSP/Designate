import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import BarChart from '~/components/elements/charts/bar/BarChart';

interface ITableData {
    Year:string;
    Value:string;
}

interface IDividendHistoryBlock {
    table: IDatoTable<ITableData>;
}

const DividendHistoryBlock:any = ({ table }:IDividendHistoryBlock) : ReactNode => {
    const chartData:any = [];

    table.data.map((value:ITableData) => {
        chartData.push({
            label: value.Year,
            value: value.Value
        });
    });

    return <ContentBlock py={8}>
        <BarChart data={{
            values: chartData
        }} />
    </ContentBlock>;
};

export default DividendHistoryBlock;
