import { useState, useEffect } from 'react';
import { Canvas, SelectField } from 'datocms-react-ui';
import { doQuery, queries } from '~/dato/api';

interface Props {
    ctx: any;
}

const EventsRSVPAttendingConfigScreen = ({ ctx }: Props) : any => {
    const [events, setEvents] = useState([]);
    const [attending, setAttending] = useState([]);

    useEffect(() => {
        (async () => {
            debugger;
            if(ctx.itemId) {
                const values = await doQuery(queries.eventRSVPEventDates, ({ id: ctx.itemId })).then(({ eventRSVPS }) => eventRSVPS);

                const events = values[0]['_allReferencingEventBundles'][0]['events'];
                setEvents(events);
                setAttending(events.filter((event) => {
                    return !!ctx.formValues.events_attending.find((attending:string) => {
                        return event.id === attending;
                    });
                }).map((event) => {
                    return {
                        label: event.label,
                        value: event.id
                    };
                }));
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await ctx.setFieldValue('events_attending', attending.map((attending) => {
                return attending.value;
            }));
        })();
    }, [attending]);

    return <Canvas ctx={ctx}>
        <SelectField
            name="events_attending"
            id="events_attending"
            label="Events"
            value={attending}
            selectInputProps={{
                isMulti: true,
                options: events.map((eventDate) => {
                    return {
                        label: eventDate.label,
                        value: eventDate.id
                    };
                }),
            }}
            onChange={(newValue:any) => {
                setAttending(newValue);
            }}
        />
    </Canvas>;
};

export default EventsRSVPAttendingConfigScreen;