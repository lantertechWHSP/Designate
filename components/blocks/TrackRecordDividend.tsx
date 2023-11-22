import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, {Theme} from '~/components/blocks/Content';
import BarChart from '~/components/elements/charts/bar/BarChart';
import { ITable } from '~/interfaces/util/table';
import { Heading } from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface ITableRow {
    Year:string;
    Value:string;
}

interface ITrackRecordDividendBlock extends IBlock {
    title?:string;
    table?: ITable<ITableRow>;
}

const TrackRecordDividendBlock:any = ({ title, table, paddingTop, paddingBottom, theme }:ITrackRecordDividendBlock) : ReactNode => {
    const backgroundColor:string = theme === Theme.Dark ? 'olive' : 'white';
    const textColor:string = theme === Theme.Dark ? 'white' : 'charcoal';
    const chartTextColor:string = theme === Theme.Dark ? 'whiteBlur' : 'steel';
    const fillColor:string = theme === Theme.Dark ? 'white' : 'lightGrey';
    const borderColor:string = theme === Theme.Dark ? 'whiteBlur2' : 'borderColor';
    const borderColorDark:string = theme === Theme.Dark ? 'white' : 'charcoal';

    const chartData:any = [];

    if(table && Array.isArray(table.data) && table.data.length > 0) {
        table.data.map((row:ITableRow) => {
            chartData.push({
                label: row.Year,
                value: row.Value
            });
        });
    }

    return <ContentBlock background={backgroundColor} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionSubheading" color={textColor} mb={[4, 6, ,8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        <BarChart data={{ bars: chartData }} textColor={chartTextColor} fillColor={fillColor} borderColor={borderColor} borderColorDark={borderColorDark} />
    </ContentBlock>;
};

export default TrackRecordDividendBlock;
