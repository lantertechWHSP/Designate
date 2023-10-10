import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import BarChart from '~/components/elements/charts/bar/BarChart';
import { IDatoTable } from '~/interfaces/util/table';

interface ITableData {
    Year:string;
    Value:string;
}

interface ITrackRecordDividendBlockProps {
    table: IDatoTable<ITableData>;
}

const TrackRecordDividendBlock:any = ({ table }:ITrackRecordDividendBlockProps) : ReactNode => {
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
