import { ReactNode } from 'react';
import { Box, Alert } from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent } from '~/interfaces/models/event';

interface IEventList {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventList) : ReactNode => {
    return <Box>
        {
            (Array.isArray(events) && events.length > 0) ? <>
                {
                    events.map((event:IEvent, index:number) => {
                        return <Box borderTop="1px solid" borderColor="lightGrey2" key={index}>
                            <EventCard {...event} />
                        </Box>;
                    })
                }
                <Box borderBottom="1px solid" borderColor="lightGrey2" />
            </> : <Box>
                <Alert status="info">No Events</Alert>
            </Box>
        }
    </Box>;
};

export default EventList;
