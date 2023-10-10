import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { ITable } from '~/interfaces/util/table';

interface IDividendHistoryTable {
    table:ITable<any>
}

const DividendHistoryTableBlock:any = ({ table }:IDividendHistoryTable) : ReactNode => {
    return <ContentBlock>

    </ContentBlock>;
}

export default DividendHistoryTableBlock;
