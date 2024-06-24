import { ReactNode } from 'react';
import { Box, Alert, Flex } from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent } from '~/interfaces/models/event';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IEventList {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventList) : ReactNode => {
    return <Box>
        {
            (Array.isArray(events) && events.length > 0) ? <>
                <Box borderBottom="3px solid" borderColor="borderColor">
                    <Flex direction={['row']} mx={-4} pb={2} width="100%" fontSize="16px"
                        lineHeight="22px">
                        <Box mb={0} px={4} width={['100%', ,'50%']}>
                            <AnimateOverflow>
                                Event
                            </AnimateOverflow>
                        </Box>
                        <Box mb={0} px={4} width="50%" display={['none', ,'block']}>
                            <AnimateOverflow>
                                Date(s)
                            </AnimateOverflow>
                        </Box>
                    </Flex>
                </Box>
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
