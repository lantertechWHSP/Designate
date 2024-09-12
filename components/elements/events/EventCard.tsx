import { ReactNode, useState, useEffect } from 'react';
import { IEvent } from "~/interfaces/models/event";
import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import AddToCalendar from '~/components/elements/events/AddToCalendar';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { SectionLink } from "~/components/elements/sectionLink";
import { isNil as _isNil } from 'lodash';

interface IEventDateCard extends IEvent {
}

const EventCard:any = ({ title, allDay, startDate, endDate, location, isRsvp, rsvpCutOffDate }:IEventDateCard) : ReactNode => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateFormatted, setDateFormatted] = useState('');

    const [startDateObject, setStartDateObject] = useState(null);
    const [endDateObject, setEndDateObject] = useState(null);

    const [startDateOutlook, setStartDateOutlook] = useState(null);
    const [endDateOutlook, setEndDateOutlook] = useState(null);

    const [allDayDate, setAllDayDate] = useState('');

    useEffect(() => {
        setDateFormatted(DateTime.fromISO(startDate).toFormat('MMM d, yyyy'));
        setStartDateObject(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).toUTC());
        setStartDateOutlook(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).toFormat('yyyy-MM-dd\'T\'HH:mm:ss'));

        setAllDayDate(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).toUTC(0, { keepLocalTime: true }).toFormat('yyyy-MM-dd\'T\'HH:mm:ss'));

        if(endDate && DateTime.fromISO(endDate) > DateTime.fromISO(startDate)) {
            setEndDateObject(DateTime.fromISO(endDate, {zone: 'Australia/Melbourne'}).toUTC());
            setEndDateOutlook(DateTime.fromISO(endDate, {zone: 'Australia/Melbourne'}).toFormat('yyyy-MM-dd\'T\'HH:mm:ss'));
        }
    }, []);

    return <Flex py={[4, ,'22px']}
        direction={['row']}
        mx={-4}
        align="center"
        cursor="pointer">
        <Flex
            direction={['column', , 'row']}
            width={['70%', ,'83.33333333%']}
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
                        {dateFormatted}
                    </Text>
                    </AnimateOverflow>
                </Box>
            }
        </Flex>
        <Flex width={['30%', ,'16.6666666667%']}
            justify="flex-end"
            px={4}>
            {
                DateTime.now() < DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}) &&
                <>
                    {
                        (isRsvp && (_isNil(rsvpCutOffDate) || (!_isNil(rsvpCutOffDate) &&  DateTime.now() < DateTime.fromISO(rsvpCutOffDate, { zone : 'Australia/Melbourne'})))) && <AnimateOverflow>
                            <SectionLink href="/investor-centre/key-dates#rsvp" pr={[2, ,4]}>
                                RSVP
                            </SectionLink>
                        </AnimateOverflow>
                    }
                    {
                        <AnimateOverflow>
                            <AddToCalendar
                                isOpen={isOpen}
                                open={() => {
                                    setIsOpen(true);
                                }}
                                onClose={() => {
                                    setIsOpen(false);
                                }}
                                msEvent={{
                                    title: title,
                                    location: location,
                                    start: !allDay ? startDateOutlook : allDayDate,
                                    end: !allDay && (DateTime.fromISO(endDate) > DateTime.fromISO(startDate)) ? endDateOutlook : null,
                                    allDay: allDay || false
                                }}
                                event={{
                                    title: title,
                                    location: location,
                                    start: !allDay ? startDateObject : allDayDate,
                                    end: !allDay && (DateTime.fromISO(endDate) > DateTime.fromISO(startDate)) ? endDateObject : null,
                                    allDay: allDay || false
                                }}>
                            </AddToCalendar>
                        </AnimateOverflow>
                    }
                </>
            }
        </Flex>
    </Flex>;
};

export default EventCard;

