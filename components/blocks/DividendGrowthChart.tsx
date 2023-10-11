import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import StackedBarChart from '~/components/elements/charts/stackedBar/StackedBarChart';

interface IDividendGrowthChart {
}

const DividendGrowthChart:any = ({ _table, _description }:IDividendGrowthChart) : ReactNode => {
    return <ContentBlock py={8}>
        Carl!!!
        <StackedBarChart />
    </ContentBlock>
}

export default DividendGrowthChart;
