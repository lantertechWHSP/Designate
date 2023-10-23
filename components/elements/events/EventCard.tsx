import { ReactNode } from 'react';
import { IEvent } from "~/interfaces/models/event";
import { Flex, Heading, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import AddToCalendar from '~/components/elements/events/AddToCalendar';

interface IEventCard extends IEvent {
}

const EventCard:any = ({ title, allDay, startDate, endDate, details, location }:IEventCard) : ReactNode => {
    return <Flex py={4} direction={['row']}
        _hover={{
            transition: 'background 0.3s linear',
            background: 'lightGrey2Blur'
        }}>
        {
            title && <Heading as="h3"
                flex={1}
                variant="listItem">
                {title}
            </Heading>
        }
        {
            startDate && <Text
                variant="listLabel"
                textAlign={['right', ,'left']}
                minWidth={['140px', ,'30%']}
                maxWidth={['140px', ,'30%']}
                mb={0} >
                {DateTime.fromISO(startDate).toFormat('d/M/yyyy')}
            </Text>
        }
        <Flex minWidth={['unset', ,'140px']}
            justify="flex-end"
            display={['none', ,'flex']}>
            {
                <AddToCalendar
                    event={{
                        title: title,
                        description: details,
                        location: location,
                        start: startDate,
                        end: endDate !== startDate ? endDate : null,
                        allDay: allDay || false
                    }}>
                </AddToCalendar>
            }
        </Flex>
    </Flex>;
};

export default EventCard;
