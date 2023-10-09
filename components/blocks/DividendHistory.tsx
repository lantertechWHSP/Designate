import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import Chart from '~/components/blocks/DividendHistory/chart/Chart';

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
        })
    });

    return <ContentBlock mb={8}>
        <Chart data={chartData} />
    </ContentBlock>;
};

export default DividendHistoryBlock;
