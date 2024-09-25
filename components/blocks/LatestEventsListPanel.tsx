import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import LatestEventList from '~/components/elements/events/LatestEventList';
import { Heading } from '@chakra-ui/react';

interface ILatestEventListPanelBlock extends IBlock {
    title?:string;
    data: {
        events:IEvent[];
    };
}

const LatestEventListPanelBlock:any = ({ title, background, paddingTop, paddingBottom, data: { events } }:ILatestEventListPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                {title}
            </Heading>
        }
        <LatestEventList events={events} />
    </ContentBlock>;
};

export default LatestEventListPanelBlock;

LatestEventListPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.latestEvents, { first: 7 });

    return result;
};
