import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import BarChart from '~/components/elements/charts/bar/BarChart';
import { ITable } from '~/interfaces/util/table';
import { Heading, Box } from '@chakra-ui/react';

interface ITableRow {
    Year:string;
    Value:string;
}

interface ITrackRecordDividendBlock extends IBlock, ChakraProps {
    title?:string;
    table?: ITable<ITableRow>;
}

const TrackRecordDividendBlock:any = ({ title, table }:ITrackRecordDividendBlock) : ReactNode => {
    const chartData:any = [];

    table.data.map((row:ITableRow) => {
        chartData.push({
            label: row.Year,
            value: row.Value
        });
    });

    return <ContentBlock background="darkBrown">
        {
            title && <Heading as="h2" variant="sectionSubheading" color="white" mb={12}>
                {title}
            </Heading>
        }
        <Box sx={{
            '.tick': {
                color: 'whiteBlur !important'
            },
            '.y-axis .tick line': {
                color: 'whiteBlur !important'
            },
            '.bar': {
                fill: 'white !important'
            }
        }}>
            <BarChart data={{ bars: chartData }} />
        </Box>
    </ContentBlock>;
};

export default TrackRecordDividendBlock;
