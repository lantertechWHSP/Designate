import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import EventDateList from "~/components/elements/events/EventDateList";
import { IEventDate } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import { Heading } from '@chakra-ui/react';

interface IEventsPanelBlock extends IBlock {
    title?:string;
    data: {
        eventDates:IEventDate[];
    };
}

const EventsPanelBlock:any = ({ title, background, paddingTop, paddingBottom, data: { eventDates } }:IEventsPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                {title}
            </Heading>
        }
        <EventDateList eventDates={eventDates} />
    </ContentBlock>;
};

export default EventsPanelBlock;

EventsPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.eventDates);

    return result;
};
