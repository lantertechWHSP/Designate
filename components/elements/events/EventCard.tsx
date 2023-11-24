import { ReactNode, useState } from 'react';
import { IEvent } from "~/interfaces/models/event";
import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import AddToCalendar from '~/components/elements/events/AddToCalendar';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IEventCard extends IEvent {
}

const EventCard:any = ({ title, allDay, startDate, endDate, details, location }:IEventCard) : ReactNode => {
    const [isOpen, setIsOpen] = useState(false);

    return <Flex py={[4, ,'22px']}
        direction={['row']}
        mx={-4}
        align="center"
        cursor="pointer"
        role="group"
        onClick={() => {
            setIsOpen(true);
        }}>
        <Flex
            direction={['column', , 'row']}
            width={['83.33333333%']}
            px={4}>
            {
                title && <Heading as="h3"
                    width={['unset', ,'60.3%']}
                    variant="listItem">
                    <AnimateOverflow>
                        {title}
                    </AnimateOverflow>
                </Heading>
            }
            {
                startDate && <Box>
                    <AnimateOverflow><Text
                        variant="listLabel"
                        mb={0}>
                        {DateTime.fromISO(startDate).toFormat('MMM d, yyyy')}
                    </Text>
                    </AnimateOverflow>
                </Box>
            }
        </Flex>
        <Flex width={['16.6666666667%']}
            justify="flex-end"
            px={4}>
            {
                <AnimateOverflow>
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
                </AnimateOverflow>
            }
        </Flex>
    </Flex>;
};

export default EventCard;
