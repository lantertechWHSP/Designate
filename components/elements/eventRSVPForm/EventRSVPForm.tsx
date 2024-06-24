import React, { ReactNode, useState } from 'react';
import {
    Box,
    Input,
    Heading,
    Flex,
    Checkbox,
    RadioGroup,
    Radio,
    Button,
    Text,
    Alert,
    Stack,
    Spinner
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { IEvent, IEventDate } from '~/interfaces/models/event';
import ReCAPTCHA from 'react-google-recaptcha';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import StructuredContent from "~/components/StructuredContent";
import { DateTime } from 'luxon';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

interface IEventRSVP {
    event:IEvent;
}

const EventRSVPForm:any = ({ event }:IEventRSVP) : ReactNode => {
    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);

    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState<boolean>(false);
    const [successMessage, setSucessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isApiSubmitting, setIsApiSubmitting] = useState(false);

    const recaptchaRef:any = React.createRef();

    const INITIAL_VALUES:any = {
        name: '',
        isShareholder: null,
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
        name: yup.string().required('Please enter your Name.').matches(REGEXP.NAME, 'Please enter a valid Name.'),
        isShareholder: yup.boolean()
            .required("Please identify if you are a shareholder.")
            .oneOf([true, false]),
        eventId: yup.string().required(),
        eventDates: yup.array().of(yup.object({
            id: yup.string().required(),
            attending: yup.boolean()
        })),
        email: yup.string().required('Please enter an Email Address.').email('Please enter a valid Email Address.'),
        recaptcha: yup.string().required('Please tick the reCAPTCHA.')
    });

    const submit = (values, resetForm) : void => {
        setErrorMessage('');
        setSucessMessage('');
        setIsApiSubmitting(true);

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
            recaptchaRef.current?.props?.grecaptcha.reset();
            setIsApiSubmitting(false);
        });
    };

    const isInvalid:any = (flag:boolean) : string => {
        return flag ? 'is-invalid' : '';
    };

    return <Box id="rsvp">
        <Heading as="h2" variant="sectionHeading" color="charcoal" fontWeight={700} mb={4}>
            {event.title}
        </Heading>
        <Box mb={8}>
            <Row>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.EightTwelfths]}>
                    <Box mb={4}>
                        <StructuredContent content={event.description} />
                    </Box>
                </Column>
            </Row>
        </Box>
        <Heading as="h3" variant="h3" mb={4}>
            RSVP
        </Heading>
        <Row>
            {
                !isSuccessfulSubmit ? <Column width={[ColumnWidth.Full, ,ColumnWidth.EightTwelfths]}><Formik
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
                                    <RadioGroup onChange={(value:any) => {
                                        let booleanValue:boolean|null;
                                        if(value === 'true') {
                                            booleanValue = true;
                                        }
                                        else if(value === 'false') {
                                            booleanValue = false;
                                        }
                                        else {
                                            booleanValue = null;
                                        }

                                        setFieldValue('isShareholder', booleanValue);
                                    }}>
                                        <Stack direction={['column', , 'row']}>
                                            <Radio value="true" variant="radio" mr={6}>Yes</Radio>
                                            <Radio value="false" variant="radio" mr={6}>No</Radio>
                                        </Stack>
                                    </RadioGroup>
                                    {
                                        (errors.isShareholder && (touched.isShareholder && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.isShareholder.toString()}</Text>
                                    }
                                </Flex>
                                {
                                    event.eventDates.length > 1 && <Flex direction="column" mb={6}>
                                        <Text as="label" variant="label" mb={1}>
                                            Which events will you be attending?
                                        </Text>
                                        <Stack direction={['column', , 'row']}>
                                            {
                                                event.eventDates.map((eventDate:IEventDate, index:number) => {
                                                    return <Checkbox variant="checkbox" key={index} mr={8} onChange={(e:any) => {
                                                        setFieldValue(`eventDates.${index}.attending`, e.target.checked);
                                                    }}>
                                                        {eventDate.label}, {DateTime.fromISO(eventDate.startDate).toFormat('d MMM')}
                                                    </Checkbox>;
                                                })
                                            }
                                        </Stack>
                                    </Flex>
                                }
                                {
                                    event.eventDates.length === 1 && <Flex direction="column" mb={6}>
                                        <Text as="label" variant="label" mb={1}>
                                            Will you be attending this event?
                                        </Text>
                                        <Stack direction={['column', , 'row']}>
                                            {
                                                event.eventDates.map((_eventDate:IEventDate, index:number) => {
                                                    return <Checkbox variant="checkbox" key={index} mr={8} onChange={(e:any) => {
                                                        setFieldValue(`eventDates.${index}.attending`, e.target.checked);
                                                    }}>
                                                        Yes.
                                                    </Checkbox>;
                                                })
                                            }
                                        </Stack>
                                    </Flex>
                                }
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
                                        <Text as="div" variant="caption" mt={8} fontSize="13px" color="darkSteel">
                                            <StructuredContent content={event.disclaimer} />
                                        </Text>
                                    </Column>
                                </Row>
                                {
                                    errorMessage && <Alert status="error" variant="error" mt={4}>
                                        {errorMessage}
                                    </Alert>
                                }
                                <Button type="submit" w="200px" rightIcon={isApiSubmitting && <Spinner size='sm' />} disabled={isApiSubmitting} variant="button" mt={8}>Submit</Button>
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

export default EventRSVPForm;