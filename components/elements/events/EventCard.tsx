import { ReactNode } from 'react';
import { IEvent } from "~/interfaces/models/event";
import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { DateTime } from 'luxon';
import AddToCalendar from '~/components/elements/events/AddToCalendar';

interface IEventCardProps extends IEvent, ChakraProps {
}

const EventCard:any = ({ title, allDay, startDate, endDate, details, location }:IEventCardProps) : ReactNode => {
    return <Flex py={4} direction={['row']} alignItems={['center']}>
        {
            title && <Heading as="h3"
                flex={1}
                variant="listItem">
                {title}
            </Heading>
        }
        {
            startDate && <Text variant="listItemDate"
                textAlign={['left', ,'right']}
                ml={4}
                mb={0}>
                {DateTime.fromISO(startDate).toFormat('d/M/yyyy')}
            </Text>
        }
        <Box ml={4}>
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
        </Box>
    </Flex>;
};

export default EventCard;
