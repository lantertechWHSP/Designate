import { ReactNode } from 'react';
import { Box, Alert, Flex, Text } from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent } from '~/interfaces/models/event';

interface IEventList {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventList) : ReactNode => {
    return <Box>
        {
            (Array.isArray(events) && events.length > 0) ? <>
                <Flex direction={['row']} borderBottom="3px solid" borderColor="borderColor">
                    <Text fontSize="16px"
                          mb={2}
                          flex="1"
                          lineHeight="22px"
                          letterSpacing="0.16px">
                        Event
                    </Text>
                    <Text fontSize="16px"
                          mb={2}
                          lineHeight="22px"
                          minWidth={['90px', ,'calc(30% + 146px)']}
                          maxWidth={['90px', ,'calc(30% + 146px)']}
                          letterSpacing="0.16px">
                        Date
                    </Text>
                </Flex>
                {
                    events.map((event:IEvent, index:number) => {
                        return <Box borderBottom="1px solid" borderColor="borderColor" key={index}>
                            <EventCard {...event} />
                        </Box>;
                    })
                }
            </> : <Box>
                <Alert status="info">No Events</Alert>
            </Box>
        }
    </Box>;
};

export default EventList;
