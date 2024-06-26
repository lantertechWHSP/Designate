import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import EventList from "~/components/elements/events/EventList";
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import { Heading } from '@chakra-ui/react';

interface IEventsPanelBlock extends IBlock {
    title?:string;
    data: {
        events:IEvent[];
    };
}

const EventsPanelBlock:any = ({ title, background, paddingTop, paddingBottom, data: { events } }:IEventsPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                {title}
            </Heading>
        }
        <EventList events={events} />
    </ContentBlock>;
};

export default EventsPanelBlock;

EventsPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.events);

    return result;
};
