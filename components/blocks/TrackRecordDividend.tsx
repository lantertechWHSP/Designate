import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import BarChart from '~/components/elements/charts/bar/BarChart';
import { ITable } from '~/interfaces/util/table';

interface ITableRow {
    Year:string;
    Value:string;
}

interface ITrackRecordDividendBlock {
    table: ITable<ITableRow>;
}

const TrackRecordDividendBlock:any = ({ table }:ITrackRecordDividendBlock) : ReactNode => {
    const chartData:any = [];

    table.data.map((row:ITableRow) => {
        chartData.push({
            label: row.Year,
            value: row.Value
        });
    });

    return <ContentBlock py={8}>
        <BarChart data={{
            values: chartData
        }} />
    </ContentBlock>;
};

export default TrackRecordDividendBlock;
