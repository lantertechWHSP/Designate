import { useState, useEffect } from 'react';
import { Canvas, SelectField } from 'datocms-react-ui';
import { buildClient } from "@datocms/cma-client-browser";
import { Alert } from '~/plugins/eventsRSVP/alert/alert';

interface Props {
    ctx: any;
}

const EventsRSVPAttendingConfigScreen = ({ ctx }: Props) : any => {
    const [events, setEvents] = useState([]);
    const [attending, setAttending] = useState([]);
    const [eventBundleId, setEventBundleId] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    // DatoCMS build Client
    const client = buildClient({
        apiToken: ctx.currentUserAccessToken,
        environment: ctx.environment
    });

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
            setErrorMessage('');

            client.items.list({
                filter: {
                    type: 'event_bundle',
                    ids: eventBundleId
                },
            }).then((eventBundles:any) => {
                const eventIds = eventBundles[0].events;

                client.items.list({
                    filter: {
                        type: 'event',
                        ids: eventIds,
                    }
                }).then((apiEvents) => {
                    setEvents(apiEvents);

                    if(ctx.formValues.events_attending) {
                        setAttending(apiEvents.filter((event) => {
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
                }).catch(() => {
                    setErrorMessage('Could not load Events');
                });
            }).catch(() => {
                setErrorMessage('Could not load Events');
            });
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
        {
            !errorMessage ? <SelectField
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
            /> : <Alert variant="error">
                {errorMessage}
            </Alert>
        }

    </Canvas>;
};

export default EventsRSVPAttendingConfigScreen;