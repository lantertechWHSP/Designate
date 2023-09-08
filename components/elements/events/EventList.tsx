import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent } from '~/interfaces/models/event';

interface IEventListProps {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventListProps) : ReactNode => {
    return <Box py={8} background="lightGrey3">
        <Container>
            {
                (Array.isArray(events) && events.length > 0) && <>
                    {
                        events.map((event:IEvent, index:number) => {
                            return <Box borderTop="1px solid" borderColor="lightGrey2" key={index}>
                                <EventCard {...event} />
                            </Box>;
                        })
                    }
                    <Box borderBottom="1px solid" borderColor="lightGrey2" />
                </>
            }
        </Container>
    </Box>;
};

export default EventList;