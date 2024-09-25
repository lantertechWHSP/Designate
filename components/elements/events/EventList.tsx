import { ReactNode, useEffect, useState } from 'react';
import {Box, Alert, Flex, Heading} from '@chakra-ui/react';
import EventCard from '~/components/elements/events/EventCard';
import { IEvent, IEventGroup } from '~/interfaces/models/event';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { forOwn as _forOwn, groupBy as _groupBy} from 'lodash';
import { DateTime } from 'luxon';

interface IEventDateList {
    events:IEvent[];
}

const EventList:any = ({ events }:IEventDateList) : ReactNode => {
    const [eventGroups, setEventGroups] = useState([]);

    useEffect(() => {
        const newSortedEventGroups:IEventGroup[] = [];

        _forOwn(_groupBy(events, (event:IEvent) => {
            return DateTime.fromISO(event.startDate, { zone : 'Australia/Melbourne' }).toFormat('yyyy');
        }), (document:IEvent[], key:string) => {
            newSortedEventGroups.push({
                title: key,
                events: document
            });
        });

        setEventGroups(newSortedEventGroups.reverse());
    }, [events]);
    
    return <Box>
        {
            (Array.isArray(events) && events.length > 0) ? <>
                {
                    eventGroups.map((eventGroup:IEventGroup, index:number) => {
                        return <Box key={index} pb={8}>
                            <Heading as="h2" variant="sectionHeading" mb={4}>{eventGroup.title}</Heading>
                            {
                                (Array.isArray(eventGroup.events) && eventGroup.events.length > 0) && <>
                                    {
                                        eventGroup.events.map((event:IEvent, index:number) => {
                                            return <Box borderBottom="1px solid" borderColor="borderColor" key={index}>
                                                <EventCard {...event} />
                                            </Box>;
                                        })
                                    }
                                </>
                            }
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
