import React, { ReactNode, useState } from 'react';
import {Box, Input, Heading, Flex, Checkbox, Button, Text} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const EventRSVP:any = () : ReactNode => {
    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);
    const [status, setStatus] = useState<string>();
    const [message, setMessage] = useState<string>();

    const INITIAL_VALUES:any = {
        name: '',
        isShareholder: true,
        email: ''
    };

    const REGEXP = {
        NAME: /^[a-zÀ-ÿ\d'’\s-]+$/i,
    };

    const SCHEMA:any = yup.object({
        name: yup.string().required('Please enter your Name').matches(REGEXP.NAME, 'Please enter a valid First Name'),
        isShareHolder: yup.boolean(),
        email: yup.string().required('Please enter an Email Address').email('Please enter a valid Email Address')
    });

    const submit:any = (values, resetForm) : void => {
        setStatus('');
        console.log(values);
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
                            <label htmlFor="isShareholder">Is Shareholder
                                <Field as={Checkbox} name="isShareHolder" onChange={(event) => {
                                    setFieldValue('isShareHolder', event.target.checked);
                                }}>

                                </Field>
                            </label>
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