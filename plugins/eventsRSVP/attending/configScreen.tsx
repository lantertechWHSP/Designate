import { useState, useEffect } from 'react';
import { Canvas, SelectField } from 'datocms-react-ui';
import { doQuery, queries } from '~/dato/api';

interface Props {
    ctx: any;
}

const EventsRSVPAttendingConfigScreen = ({ ctx }: Props) : any => {
    const [eventDates, setEventDates] = useState([]);
    const [attending, setAttending] = useState([]);

    useEffect(() => {
        (async () => {
            const values = await doQuery(queries.eventRSVPEventDates, ({ id: ctx.itemId })).then(({ eventRSVPS }) => eventRSVPS);

            const eventDates = values[0]['_allReferencingEvents'][0]['eventDates'];
            setEventDates(eventDates);
            setAttending(eventDates.filter((eventDate) => {
                return !!ctx.formValues.event_dates_attending.find((attending:string) => {
                    return eventDate.id === attending;
                });
            }).map((eventDate) => {
                return {
                    label: eventDate.label,
                    value: eventDate.id
                };
            }));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await ctx.setFieldValue('event_dates_attending', attending.map((attending) => {
                return attending.value;
            }));
        })();
    }, [attending]);

    return <Canvas ctx={ctx}>
        <SelectField
            name="event_dates_attending"
            id="event_dates_attending"
            label="Event Dates"
            value={attending}
            selectInputProps={{
                isMulti: true,
                options: eventDates.map((eventDate) => {
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