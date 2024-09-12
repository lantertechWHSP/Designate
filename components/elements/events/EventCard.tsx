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

const EventCard:any = ({ title, startDate, endDate, location, isRsvp, rsvpCutOffDate }:IEventDateCard) : ReactNode => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateFormatted, setDateFormatted] = useState('');

    const [startDateObject, setStartDateObject] = useState(null);
    const [endDateObject, setEndDateObject] = useState(null);

    const [startDateOutlook, setStartDateOutlook] = useState(null);
    const [endDateOutlook, setEndDateOutlook] = useState(null);

    useEffect(() => {
        setDateFormatted(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).toFormat('MMM d, yyyy') + ' AEST');
        setStartDateObject(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).toUTC());
        setStartDateOutlook(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).toFormat('yyyy-MM-dd\'T\'HH:mm:ss'));

        if(endDate && endDate > startDate) {
            setEndDateObject(DateTime.fromISO(endDate, { zone : 'Australia/Melbourne'}).toUTC());
            setEndDateOutlook(DateTime.fromISO(endDate, { zone : 'Australia/Melbourne'}).toFormat('yyyy-MM-dd\'T\'HH:mm:ss'));
        }
        else {
            setEndDateObject(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).plus({ days: 1 }).toUTC());
            setEndDateOutlook(DateTime.fromISO(startDate, { zone : 'Australia/Melbourne'}).plus({ days: 1 }).toFormat('yyyy-MM-dd\'T\'HH:mm:ss'));
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
                DateTime.now() < DateTime.fromISO(startDate) &&
                <>
                    {
                        (isRsvp && (_isNil(rsvpCutOffDate) || (!_isNil(rsvpCutOffDate) &&  DateTime.now() < DateTime.fromISO(rsvpCutOffDate)))) && <AnimateOverflow>
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
                                    start: startDateOutlook,
                                    end: endDateOutlook,
                                }}
                                event={{
                                    title: title,
                                    location: location,
                                    start: startDateObject,
                                    end: endDateObject,
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

