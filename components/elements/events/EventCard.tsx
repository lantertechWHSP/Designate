import { ReactNode, useState } from 'react';
import { IEvent } from "~/interfaces/models/event";
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import AddToCalendar from '~/components/elements/events/AddToCalendar';

interface IEventCard extends IEvent {
}

const EventCard:any = ({ title, allDay, startDate, endDate, details, location }:IEventCard) : ReactNode => {
    const [isOpen, setIsOpen] = useState(false);

    return <Flex py={[4, ,'22px']} direction={['row']}
        align="center"
        cursor="pointer"
        role="group"
        onClick={() => {
            setIsOpen(true);
        }}>
        <Flex direction={['column', , 'row']}
              flex={1}
              pr={2}>
            {
                title && <Heading as="h3"
                    variant="listItem">
                    {title}
                </Heading>
            }
            {
                startDate && <Text
                    variant="listLabel"
                    minWidth={['100%', '20%', '30%']}
                    maxWidth={['100%', '20%', '30%']}
                    mb={0} >
                    {DateTime.fromISO(startDate).toFormat('d/M/yyyy')}
                </Text>
            }
        </Flex>
        <Flex minWidth={['60px', '140px']}
            justify="flex-end">
            {
                <AddToCalendar
                    isOpen={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                    }}
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
