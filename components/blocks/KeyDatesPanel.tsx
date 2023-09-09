import { ReactNode } from 'react';
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import EventList from "~/components/elements/events/EventList";
import ContentBlock from "~/components/blocks/Content";
import { Box, Heading } from '@chakra-ui/react';

const KeyDatesPanelBlock:any = ({ data: { events } }) : ReactNode => {
    return <ContentBlock py={8}>
        <Box mb={8}>
            <Heading as="h2" variant="sectionHeading">
                Key Dates
            </Heading>
        </Box>
        <EventList events={events} />
    </ContentBlock>;
}

KeyDatesPanelBlock.getData = async () => {
    const result:IEvent[] = await doQuery(queries.events);
    return result;
};

export default KeyDatesPanelBlock;
