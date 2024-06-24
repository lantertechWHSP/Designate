import React, { ReactNode, useState } from 'react';
import { Box, Input, Heading, Flex, Checkbox, RadioGroup, Radio, Button, Text, Alert, Stack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { IEvent, IEventDate } from '~/interfaces/models/event';
import ReCAPTCHA from 'react-google-recaptcha';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import StructuredContent from "~/components/StructuredContent";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

interface IEventRSVP {
    event:IEvent;
}

const EventRSVP:any = ({ event }:IEventRSVP) : ReactNode => {
    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);

    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState<boolean>(false);
    const [successMessage, setSucessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const recaptchaRef:any = React.createRef();

    const INITIAL_VALUES:any = {
        name: '',
        isShareholder: false,
        eventId: event.id,
        eventDates: event.eventDates.map((eventDate:IEventDate) => {
            return {
                id: eventDate.id,
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
        eventId: yup.string().required(),
        eventDates: yup.array().of(yup.object({
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
                setSucessMessage(`Thank you ${values.name} for your RSVP to attend the ${event.title} event.`);
            }
            else {
                setErrorMessage(data.message);
            }
        }).catch((error) => {
            setErrorMessage(error.message);
        }).finally(() => {
            recaptchaRef.current.props?.grecaptcha.reset();
        });
    };

    const isInvalid:any = (flag:boolean) : string => {
        return flag ? 'is-invalid' : '';
    };

    return <Box>
        <Heading as="h2" variant="sectionSubheading" color="olive" fontWeight={700} mb={8}>
            RSVP
        </Heading>
        <Row>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths]}>
                <StructuredContent content={event.description} />
            </Column>
        </Row>
        <Row>
            {
                !isSuccessfulSubmit ? <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths]}><Formik
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
                                <Row>
                                    <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]}>
                                        <Flex direction="column" mb={6}>
                                            <Text as="label" htmlFor="name" variant="label" className={isInvalid(errors.name && (touched.name && isAttemptedSubmit))} mb={1}>Name</Text>
                                            <Field as={Input} type="name" id="name" name="name" data-invalid={(errors.name && (touched.name && isAttemptedSubmit))} />
                                            {
                                                (errors.name && (touched.name && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.name.toString()}</Text>
                                            }
                                        </Flex>
                                    </Column>
                                    <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]}>
                                        <Flex direction="column" mb={6}>
                                            <Text as="label" htmlFor="email" variant="label" className={isInvalid(errors.email && (touched.name && isAttemptedSubmit))} mb={1}>Email</Text>
                                            <Field as={Input} type="email" id="email" name="email" data-invalid={(errors.email && (touched.email && isAttemptedSubmit))} />
                                            {
                                                (errors.email && (touched.email && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.email.toString()}</Text>
                                            }
                                        </Flex>
                                    </Column>
                                </Row>
                                <Flex direction="column" mb={6}>
                                    <Text as="label" variant="label"  mb={1}>
                                        Are you a Soul Patts (ASX: SOL) shareholder?
                                    </Text>
                                    <RadioGroup defaultValue="false" onChange={(value:any) => {
                                        const booleanValue:boolean = value === 'true';
                                        setFieldValue('isShareholder', booleanValue);
                                    }}>
                                        <Stack direction="row">
                                            <Radio value="true" variant="radio">Yes</Radio>
                                            <Radio value="false" variant="radio">No</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Flex>
                                <Flex direction="column" mb={6}>
                                    <Text as="label" variant="label" mb={1}>
                                        Which events will you be attending?
                                    </Text>
                                    <Stack direction="row">
                                        {
                                            event.eventDates.map((eventDate:IEventDate, index:number) => {
                                                return <Checkbox variant="checkbox" key={index} onChange={(e:any) => {
                                                    setFieldValue(`eventDates.${index}.attending`, e.target.checked);
                                                }}>
                                                    {eventDate.label}
                                                </Checkbox>;
                                            })
                                        }
                                    </Stack>
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
                                <Row>
                                    <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths]}>
                                        <Text as="div" variant="caption" mt={8}>
                                            <StructuredContent content={event.disclaimer} />
                                        </Text>
                                    </Column>
                                </Row>
                                {
                                    errorMessage && <Alert status="error" variant="error" mt={4}>
                                        {errorMessage}
                                    </Alert>
                                }
                                <Button type="submit" variant="button" mt={8}>Submit</Button>
                            </Form>;
                        })
                    }
                </Formik></Column> : <Column>
                    <Alert status="success" variant="successOlive">
                        {successMessage}
                    </Alert>
                </Column>
            }
        </Row>
    </Box>;
};

export default EventRSVP;