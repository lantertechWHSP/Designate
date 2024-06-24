import { ReactNode, useState } from 'react';
import { Box, Alert, Flex } from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent } from '~/interfaces/models/event';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { DateTime } from 'luxon';

interface IEventList {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventList) : ReactNode => {
    const [sortedEvents] = useState(
        events.sort((a:IEvent, b:IEvent) => {
            const aStart = DateTime.fromISO(a.eventDates[0].startDate);
            const bStart = DateTime.fromISO(b.eventDates[0].startDate);

            if (aStart < bStart) {
                return -1;
            }
            if (aStart > bStart) {
                return 1;
            }

            return 0;
        })
    );

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
                        <Box mb={0} px={4} width="25%" display={['none', ,'block']}>
                            <AnimateOverflow>
                                Date(s)
                            </AnimateOverflow>
                        </Box>
                        <Box mb={0} px={4} width="25%" display={['none', ,'block']}>

                        </Box>
                    </Flex>
                </Box>
                {
                    sortedEvents.map((event:IEvent, index:number) => {
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
