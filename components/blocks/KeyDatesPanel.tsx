import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import EventList from "~/components/elements/events/EventList";
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import { Heading } from '@chakra-ui/react';

interface IKeyDatesPanelBlock extends ChakraProps {
    data: {
        events:IEvent[];
    };
}

const KeyDatesPanelBlock:any = ({ data: { events } }:IKeyDatesPanelBlock) : ReactNode => {
    return <ContentBlock py={8}>
        <Heading as="h2" variant="sectionHeading" mb={8}>
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
