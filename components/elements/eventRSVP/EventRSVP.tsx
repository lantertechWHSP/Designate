import React, { ReactNode, useState, Fragment } from 'react';
import { Box, Input, Heading, Flex, Checkbox, Button, Text } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { IEvent } from '~/interfaces/models/event';
import { DateTime } from 'luxon';

interface IEventRSVP {
    events:IEvent[];
}

const EventRSVP:any = ({ events }:IEventRSVP) : ReactNode => {
    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);
    const [status, setStatus] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [upcomingEvents] = useState(events.filter((event) => {
        return DateTime.fromISO(event.startDate).startOf('day') > DateTime.now().startOf('day');
    }));

    const INITIAL_VALUES:any = {
        name: '',
        isShareholder: true,
        events: upcomingEvents.map((event) => {
            return {
                id: event.id,
                attending: false
            };
        }),
        email: ''
    };

    const REGEXP = {
        NAME: /^[a-zÀ-ÿ\d'’\s-]+$/i,
    };

    const SCHEMA:any = yup.object({
        name: yup.string().required('Please enter your Name').matches(REGEXP.NAME, 'Please enter a valid First Name'),
        isShareholder: yup.boolean(),
        events: yup.array().of(yup.object({
            id: yup.string().required(),
            attending: yup.boolean()
        })),
        email: yup.string().required('Please enter an Email Address').email('Please enter a valid Email Address')
    });

    const submit:any = (values, resetForm) : void => {
        setStatus('');
        // console.log(values);

        fetch('/api/events/rsvp/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then((data) => {
            if(data.success) {
                setStatus('success');
                console.log(data.message);
                // setMessage(data.message);
                resetForm();
            }
        }).catch((_error) => {
            setStatus('error');
        });
    };

    return <Box py={['40px', ,'50px', '60px']}>
        <Heading>
            RSVP
        </Heading>
        <Formik
            validationSchema={SCHEMA}
            initialValues={INITIAL_VALUES}
            onSubmit={(values, { resetForm }) => {
                submit(values, resetForm);
            }}>
            {
                (({ handleSubmit, errors, touched, setFieldValue }) => {
                    return <Form onSubmit={(event) => {
                        setIsAttemptedSubmit(true);
                        event.preventDefault();
                        handleSubmit();
                    }} noValidate>
                        <Flex direction="column">
                            <label htmlFor="name">Name</label>
                            <Field as={Input} type="name" id="name" name="name" />
                            {
                                (errors.name && (touched.name && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.name.toString()}</Text>
                            }
                        </Flex>
                        <Flex direction="column">
                            <label htmlFor="isShareholder">Is Shareholder</label>
                            <Field as={Checkbox} name="isShareholder" onChange={(event:any) => {
                                setFieldValue('isShareholder', event.target.checked);
                            }} />
                        </Flex>
                        <Flex direction="column">
                            <label>Events</label>
                            {
                                upcomingEvents.map((upcomingEvent:IEvent, index:number) => {
                                    return <Flex key={index}>
                                        <label htmlFor="events">{upcomingEvent.title}</label>
                                        <Field as={Checkbox} name={`events.${index}.attending`} onChange={(event:any) => {
                                            setFieldValue(`events.${index}.attending`, event.target.checked);
                                        }} />
                                    </Flex>;
                                })
                            }
                        </Flex>
                        <Flex direction="column">
                            <label htmlFor="email">Email</label>
                            <Field as={Input} type="email" id="email" name="email" />
                            {
                                (errors.email && (touched.email && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.email.toString()}</Text>
                            }
                        </Flex>
                        <Button type="submit" variant="button" mt={8}>Submit</Button>
                    </Form>;
                })
            }
        </Formik>
    </Box>;
};

export default EventRSVP;