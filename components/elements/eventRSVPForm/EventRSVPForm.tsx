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
import { IEventBundle, IEvent } from '~/interfaces/models/event';
// import ReCAPTCHA from 'react-google-recaptcha';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import StructuredContent from "~/components/StructuredContent";
import { DateTime } from 'luxon';

// const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

interface IEventRSVP {
    eventBundle:IEventBundle;
    hideForm?:boolean;
}

const EventRSVPForm:any = ({ eventBundle, hideForm }:IEventRSVP) : ReactNode => {
    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);

    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState<boolean>(false);
    const [successMessage, setSucessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isApiSubmitting, setIsApiSubmitting] = useState(false);

    // const recaptchaRef:any = React.createRef();

    const FIELD_STYLE:any = {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1
    } as React.CSSProperties;

    const hash = '4AHcmLe36hUG5igKjBGfi';

    const INITIAL_VALUES:any = {
        isShareholder: null,
        eventBundleId: eventBundle.id,
        events: eventBundle.events.map((event:IEvent) => {
            return {
                id: event.id,
                attending: false
            };
        }),
        phone: null,
        // recaptcha: '',
    };

    INITIAL_VALUES[`na${hash}mfge`] = '';
    INITIAL_VALUES[`em${hash}acjl`] = '';

    const REGEXP = {
        NAME: /^[a-zÀ-ÿ\d'’\s-]+$/i,
    };

    const buildSchema = {
        isShareholder: yup.boolean()
            .required("Please identify if you are a shareholder.")
            .oneOf([true, false]),
        eventBundleId: yup.string().required(),
        events: yup.array().of(yup.object({
            id: yup.string().required(),
            attending: yup.boolean()
        })),
        phone: yup.string().nullable()
    };


    buildSchema[`na${hash}mfge`] = yup.string().required('Please enter your Name.').matches(REGEXP.NAME, 'Please enter a valid Name.');
    buildSchema[`em${hash}acjl`] = yup.string().required('Please enter an Email Address.').email('Please enter a valid Email Address.');

    const SCHEMA:any = yup.object(buildSchema);

    const submit = (values, resetForm) : void => {
        values.name = values[`na${hash}mfge`];
        delete values[`na${hash}mfge`];

        values.email = values[`em${hash}acjl`];
        delete values[`em${hash}acjl`];

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
                setSucessMessage(`Thank you ${values.name} for your RSVP to attend the ${eventBundle.title} event.`);
            }
            else {
                setErrorMessage(data.message);
            }
        }).catch((error) => {
            setErrorMessage(error.message);
        }).finally(() => {
            // recaptchaRef.current?.props?.grecaptcha.reset();
            setIsApiSubmitting(false);
        });
    };

    const isInvalid:any = (flag:boolean) : string => {
        return flag ? 'is-invalid' : '';
    };

    return <Box id="rsvp">
        <Heading as="h2" variant="sectionHeading" color="charcoal" fontWeight={700} mb={4}>
            {eventBundle.title}
        </Heading>
        <Box mb={8}>
            <Row>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.EightTwelfths]}>
                    <Box mb={4}>
                        <StructuredContent content={eventBundle.description} />
                    </Box>
                </Column>
            </Row>
        </Box>
        {
            !hideForm && <>
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
                                        <Box style={FIELD_STYLE}>
                                            <Field type="text" id="name" name="name" placeholder="Name" autoComplete="off" style={FIELD_STYLE}></Field>
                                        </Box>
                                        <Box className="form-group" style={FIELD_STYLE}>
                                            <Field type="email" id="email" name="email" placeholder="Email" autoComplete="off" style={FIELD_STYLE}></Field>
                                        </Box>
                                        <div className="form-group" style={FIELD_STYLE}>
                                            <Field type="tel" id="phone" name="phone" placeholder="Phone" autoComplete="off" style={FIELD_STYLE}></Field>
                                        </div>
                                        <Row>
                                            <Column width={[ColumnWidth.Full, , ColumnWidth.Half]}>
                                                <Flex direction="column" mb={6}>
                                                    <Text as="label" htmlFor={`na${hash}mfge`} variant="label" className={isInvalid(errors[`na${hash}mfge`] && (touched[`na${hash}mfge`] && isAttemptedSubmit))} mb={1}>Name</Text>
                                                    <Field as={Input} type="name" id={`na${hash}mfge`} name={`na${hash}mfge`} data-invalid={(errors[`na${hash}mfge`] && (touched[`na${hash}mfge`] && isAttemptedSubmit))}/>
                                                    {
                                                        (errors[`na${hash}mfge`] && (touched[`na${hash}mfge`] && isAttemptedSubmit)) &&
                                                        <Text variant="error" mt={2} mb={0}>{errors[`na${hash}mfge`].toString()}</Text>
                                                    }
                                                </Flex>
                                            </Column>
                                            <Column width={[ColumnWidth.Full, , ColumnWidth.Half]}>
                                                <Flex direction="column" mb={6}>
                                                    <Text as="label" htmlFor={`em${hash}acjl`} variant="label" className={isInvalid(errors[`em${hash}acjl`] && (touched[`em${hash}acjl`] && isAttemptedSubmit))} mb={1}>Email</Text>
                                                    <Field as={Input} type="email" id={`em${hash}acjl`} name={`em${hash}acjl`} data-invalid={(errors[`em${hash}acjl`] && (touched[`em${hash}acjl`] && isAttemptedSubmit))}/>
                                                    {
                                                        (errors[`em${hash}acjl`] && (touched[`em${hash}acjl`] && isAttemptedSubmit)) &&
                                                        <Text variant="error" mt={2} mb={0}>{errors[`em${hash}acjl`].toString()}</Text>
                                                    }
                                                </Flex>
                                            </Column>
                                        </Row>
                                        <Flex direction="column" mb={6}>
                                            <Text as="label" variant="label" mb={1}>
                                                Are you a Soul Patts (ASX: SOL) shareholder?
                                            </Text>
                                            <RadioGroup onChange={(value: any) => {
                                                let booleanValue: boolean | null;
                                                if (value === 'true') {
                                                    booleanValue = true;
                                                } else if (value === 'false') {
                                                    booleanValue = false;
                                                } else {
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
                                                (errors.isShareholder && (touched.isShareholder && isAttemptedSubmit)) &&
                                                <Text variant="error" mt={2} mb={0}>{errors.isShareholder.toString()}</Text>
                                            }
                                        </Flex>
                                        {
                                            eventBundle.events.length > 1 && <Flex direction="column" mb={6}>
                                                <Text as="label" variant="label" mb={1}>
                                                    Which events will you be attending?
                                                </Text>
                                                <Stack direction={['column', , 'row']}>
                                                    {
                                                        eventBundle.events.map((eventDate: IEvent, index: number) => {
                                                            return <Checkbox variant="checkbox" key={index} mr={8} onChange={(e: any) => {
                                                                setFieldValue(`events.${index}.attending`, e.target.checked);
                                                            }}>
                                                                {eventDate.label}, {DateTime.fromISO(eventDate.startDate).toFormat('d MMM')}
                                                            </Checkbox>;
                                                        })
                                                    }
                                                </Stack>
                                            </Flex>
                                        }
                                        {
                                            eventBundle.events.length === 1 && <Flex direction="column" mb={6}>
                                                <Text as="label" variant="label" mb={1}>
                                                    Will you be attending this event?
                                                </Text>
                                                <Stack direction={['column', , 'row']}>
                                                    {
                                                        eventBundle.events.map((_eventDate: IEvent, index: number) => {
                                                            return <Checkbox variant="checkbox" key={index} mr={8} onChange={(e: any) => {
                                                                setFieldValue(`events.${index}.attending`, e.target.checked);
                                                            }}>
                                                                Yes.
                                                            </Checkbox>;
                                                        })
                                                    }
                                                </Stack>
                                            </Flex>
                                        }
                                        {/*<Flex direction="column" mt={4}>*/}
                                        {/*    <ReCAPTCHA*/}
                                        {/*        ref={recaptchaRef}*/}
                                        {/*        sitekey={RECAPTCHA_SITE_KEY}*/}
                                        {/*        onChange={(token:any) => {*/}
                                        {/*            if (typeof token === 'string') {*/}
                                        {/*                setFieldValue('recaptcha', token);*/}
                                        {/*            }*/}
                                        {/*        }}>*/}
                                        {/*    </ReCAPTCHA>*/}
                                        {/*    {*/}
                                        {/*        (errors.recaptcha && (touched.recaptcha && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.recaptcha.toString()}</Text>*/}
                                        {/*    }*/}
                                        {/*</Flex>*/}
                                        <Row>
                                            <Column width={[ColumnWidth.Full, , ColumnWidth.TenTwelfths]}>
                                                <Text as="div" variant="caption" mt={8} fontSize="13px" color="darkSteel">
                                                    <StructuredContent content={eventBundle.disclaimer}/>
                                                </Text>
                                            </Column>
                                        </Row>
                                        {
                                            errorMessage && <Alert status="error" variant="error" mt={4}>
                                                {errorMessage}
                                            </Alert>
                                        }
                                        <Button type="submit" w="200px" rightIcon={isApiSubmitting && <Spinner size='sm'/>} disabled={isApiSubmitting} variant="button" mt={8}>Submit</Button>
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
            </>
        }

    </Box>;
};

export default EventRSVPForm;