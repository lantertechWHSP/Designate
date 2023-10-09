import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import LineChart from '~/components/elements/charts/line/LineChart';
import { DateTime } from 'luxon';

interface IShareholderReturnsChartBlock {
}

const ShareholderReturnsChartBlock:any = ({ }:IShareholderReturnsChartBlock) : ReactNode => {
    const data:any = {
        lines: [
            {
                data: [
                    {
                        date: DateTime.fromFormat('01/01/2019', "d/M/yyyy"),
                        value: 410
                    },
                    {
                        date: DateTime.fromFormat('01/01/2020', "d/M/yyyy"),
                        value: 650
                    },
                    {
                        date: DateTime.fromFormat('01/01/2021', "d/M/yyyy"),
                        value: 800
                    },
                    {
                        date: DateTime.fromFormat('01/01/2022', "d/M/yyyy"),
                        value: 900
                    },
                    {
                        date: DateTime.fromFormat('01/01/2023', "d/M/yyyy"),
                        value: 1000
                    },
                    {
                        date: DateTime.fromFormat('01/01/2024', "d/M/yyyy"),
                        value: 1250
                    }
                ]
            },
            {
                data: [
                    {
                        date: DateTime.fromFormat('01/01/2019', "d/M/yyyy"),
                        value: 700
                    },
                    {
                        date: DateTime.fromFormat('01/01/2020', "d/M/yyyy"),
                        value: 840
                    },
                    {
                        date: DateTime.fromFormat('01/01/2021', "d/M/yyyy"),
                        value: 700
                    },
                    {
                        date: DateTime.fromFormat('01/01/2022', "d/M/yyyy"),
                        value: 800
                    },
                    {
                        date: DateTime.fromFormat('01/06/2023', "d/M/yyyy"),
                        value: 950
                    },
                    {
                        date: DateTime.fromFormat('01/06/2024', "d/M/yyyy"),
                        value: 950
                    }
                ]
            }
        ]
    };

    return <ContentBlock mb={8}>
        <LineChart data={data} />
    </ContentBlock>
}

export default ShareholderReturnsChartBlock;
