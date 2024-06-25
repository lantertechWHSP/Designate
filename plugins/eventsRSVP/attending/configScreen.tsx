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
            if(ctx.formValues.event_bundle) {
                const values = await doQuery(queries.eventBundle, ({ id: ctx.formValues.event_bundle })).then(({ eventBundles }) => eventBundles);
                const events = values[0].events;

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
        console.log('!');
    }, [ctx.formValues.event_bundle]);

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
                options: events.map((event) => {
                    return {
                        label: event.label,
                        value: event.id
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