import { useState, useEffect } from 'react';
import { Canvas, SelectField } from 'datocms-react-ui';

interface Props {
    ctx: any;
}

const EventsRSVPAttendingConfigScreen = ({ ctx }: Props) : any => {
    const [events, setEvents] = useState([]);
    const [attending, setAttending] = useState([]);
    const [eventBundleId, setEventBundleId] = useState(null);

    useEffect(() => {
        if(ctx.formValues.event_bundle) {
            setEventBundleId(ctx.formValues.event_bundle);
        }
        else {
            const createBundleId:string = sessionStorage.getItem('soulpatts.dato.eventBundle.id');
            if(createBundleId) {
                (async () => {
                    await ctx.setFieldValue('event_bundle', createBundleId);
                    setEventBundleId(createBundleId);
                })();
            }
        }
    }, []);

    useEffect(() => {
        if(eventBundleId) {
            (async () => {
                const response:any = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events/event-bundles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        id: eventBundleId,
                    })
                }).then(response => response.json());

                const events = response.data.eventBundles[0].events;

                setEvents(events);

                if(ctx.formValues.events_attending) {
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
        }
    }, [eventBundleId]);

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
            label=""
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