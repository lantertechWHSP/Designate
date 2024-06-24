import { ReactNode } from 'react';
import { Box, Alert, Flex } from '@chakra-ui/react';
import EventDateCard from '~/components/elements/events/EventDateCard';
import { IEventDate} from '~/interfaces/models/event';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IEventDateList {
    eventDates:IEventDate[];
}

const EventDateList:any = ({ eventDates }:IEventDateList) : ReactNode => {
    return <Box>
        {
            (Array.isArray(eventDates) && eventDates.length > 0) ? <>
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
                                Date
                            </AnimateOverflow>
                        </Box>
                    </Flex>
                </Box>
                {
                    eventDates.map((event:IEventDate, index:number) => {
                        return <Box borderBottom="1px solid" borderColor="borderColor" key={index}>
                            <EventDateCard {...event} />
                        </Box>;
                    })
                }
            </> : <Box>
                <Alert status="info">No Events</Alert>
            </Box>
        }
    </Box>;
};

export default EventDateList;
