import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import EventList from "~/components/elements/events/EventList";
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';

interface IEventsPanelBlock extends IBlock {
    data: {
        events:IEvent[];
    };
}

const EventsPanelBlock:any = ({ background, paddingTop, paddingBottom, data: { events } }:IEventsPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <EventList events={events} />
    </ContentBlock>;
};

export default EventsPanelBlock;

EventsPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.events);

    return result;
};
