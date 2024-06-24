import { ReactNode, Fragment } from 'react';
import { IEvent } from "~/interfaces/models/event";
import { Flex, Heading, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import AddToCalendar from '~/components/elements/events/AddToCalendar';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IEventCard extends IEvent {
}

const EventCard:any = ({ title, eventDates }:IEventCard) : ReactNode => {
    return <Flex py={[4, ,'22px']}
        direction={['row']}
        mx={-4}
        align="center"
        cursor="pointer"
        role="group">
        <Flex
            direction={['column', , 'row']}
            width={['100%']}
            px={4}>
            {
                title && <Heading as="h3"
                    width={['unset', ,'50%']}
                    variant="listItem">
                    <AnimateOverflow>
                        {title}
                    </AnimateOverflow>
                </Heading>
            }
            <Flex>
                {
                    eventDates.map((eventDate, index:number) => {
                        return <Fragment key={index}>
                            <AnimateOverflow>
                                <Text variant="listLabel" mb={0} mr={4} >
                                    <AddToCalendar
                                        event={{
                                            title: title,
                                            // description: eventDate.description,
                                            location: eventDate.location,
                                            start: eventDate.startDate,
                                            allDay: eventDate.allDay || false
                                        }}>
                                        {DateTime.fromISO(eventDate.startDate).toFormat('MMM d, yyyy')}
                                    </AddToCalendar>
                                </Text>
                            </AnimateOverflow>
                        </Fragment>;
                    })
                }
            </Flex>
        </Flex>
    </Flex>;
};

export default EventCard;
