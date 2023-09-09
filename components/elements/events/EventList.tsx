import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent } from '~/interfaces/models/event';

interface IEventListProps {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventListProps) : ReactNode => {
    return <Box>
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
    </Box>;
};

export default EventList;
