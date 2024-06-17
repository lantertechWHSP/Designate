import React, { ReactNode, useState } from 'react';
import { Box, Input, Heading, Flex, Checkbox, Button, Text, Alert } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { IEvent } from '~/interfaces/models/event';
import { DateTime } from 'luxon';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

console.log(RECAPTCHA_SITE_KEY);

interface IEventRSVP {
    events:IEvent[];
}

const EventRSVP:any = ({ events }:IEventRSVP) : ReactNode => {
    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>();

    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState<boolean>(false);
    const [successMessage, setSucessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [upcomingEvents] = useState(events.filter((event) => {
        return DateTime.fromISO(event.startDate).startOf('day') > DateTime.now().startOf('day');
    }));

    const recaptchaRef:any = React.createRef();

    const INITIAL_VALUES:any = {
        name: '',
        isShareholder: true,
        events: upcomingEvents.map((event) => {
            return {
                id: event.id,
                attending: false
            };
        }),
        email: '',
        recaptcha: '',
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
        email: yup.string().required('Please enter an Email Address').email('Please enter a valid Email Address'),
        recaptcha: yup.string().required('Please tick the recaptcha')
    });

    const submit = (values, resetForm) : void => {
        setErrorMessage('');
        setSucessMessage('');

        fetch('/api/events/rsvp/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then((data) => {
            if(data.success) {
                resetForm();
                setIsSuccessfulSubmit(true);
                setSucessMessage(data.message);
            }
            else {
                setErrorMessage(data.message);
            }
        }).catch((error) => {
            setErrorMessage(error.message);
        }).finally(() => {
            recaptchaRef.current.props.grecaptcha.reset();
        });
    };

    return <Box py={['40px', ,'50px', '60px']}>
        <Heading>
            RSVP
        </Heading>
        {
            !isSuccessfulSubmit ? <Formik
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
                            <Flex direction="column" mt={4}>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    onChange={(token:any) => {
                                        if (typeof token === 'string') {
                                            setFieldValue('recaptcha', token);
                                        }
                                    }}>
                                </ReCAPTCHA>
                                {
                                    (errors.recaptcha && (touched.recaptcha && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.recaptcha.toString()}</Text>
                                }
                            </Flex>
                            {
                                errorMessage && <Alert status="error" variant="error" mt={4}>
                                    {errorMessage}
                                </Alert>
                            }
                            <Button type="submit" variant="button" mt={8}>Submit</Button>
                        </Form>;
                    })
                }
            </Formik> : <Box>
                <Alert status="success" variant="success">
                    {successMessage}
                </Alert>
            </Box>
        }

    </Box>;
};

export default EventRSVP;