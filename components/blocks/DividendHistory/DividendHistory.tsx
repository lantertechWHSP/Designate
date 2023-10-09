import { ReactNode } from 'react';
import ContentBlock from "~/components/blocks/Content";
import DividendHistoryChart from "~/components/blocks/DividendHistory/chart/DividendHistoryChart";

interface ITableData {
    Year:string;
    Value:string;
}

interface IDividendHistoryBlock {
    values: IDatoTable<ITableData>;
}

const DividendHistoryBlock:any = ({ ...props }:IDividendHistoryBlock) : ReactNode => {
    const chartData:any = [];

    props.values.data.map((value:ITableData) => {
        chartData.push({
            label: value.Year,
            value: value.Value
        })
    });

    return <ContentBlock {...props} mb={8}>
        <DividendHistoryChart data={chartData} />
    </ContentBlock>;
};

export default DividendHistoryBlock;
