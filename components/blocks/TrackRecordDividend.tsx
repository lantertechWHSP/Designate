import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import BarChart from '~/components/elements/charts/bar/BarChart';
import { ITable } from '~/interfaces/util/table';

interface ITableData {
    Year:string;
    Value:string;
}

interface ITrackRecordDividendBlock {
    table: ITable<ITableData>;
}

const TrackRecordDividendBlock:any = ({ table }:ITrackRecordDividendBlock) : ReactNode => {
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

export default TrackRecordDividendBlock;
