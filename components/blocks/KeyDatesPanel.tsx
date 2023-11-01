import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import EventList from "~/components/elements/events/EventList";
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import { Heading } from '@chakra-ui/react';

interface IKeyDatesPanelBlock extends IBlock {
    data: {
        events:IEvent[];
    };
}

const KeyDatesPanelBlock:any = ({ background, paddingTop, paddingBottom, data: { events } }:IKeyDatesPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Heading as="h2" variant="sectionHeading" mb={[4, ,8]}>
            Key Financial Dates
        </Heading>
        <EventList events={events} />
    </ContentBlock>;
};

export default KeyDatesPanelBlock;

KeyDatesPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.events);

    return result;
};
