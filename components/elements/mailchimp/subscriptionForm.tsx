import React, { ReactNode, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Heading, Container, Flex, Button, Input, Text } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
// import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';

// @TODO Subscription form and ReCaptcha
export const SubscriptionForm = () : ReactNode => {
    // const RECAPTCHA_API_KEY:string = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY;

    // @ts-ignore
    const SCHEMA = yup.object({
        email: yup.string().required("Please enter an Email Address").email("Please enter a valid Email Address")
    });

    const INITIAL_VALUES = {
        email: ''
    };

    const [status, setStatus] = useState<string>();
    const [message, setMessage] = useState<string>();

    const submit = (values, resetForm) : void => {
        setStatus('');

        fetch('api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then((data) => {
            if(data.success) {
                setStatus('success');
                setMessage(data.message);
                resetForm();
            }
        }).catch((error) => {
            console.log(error);
            setStatus('error');
        });
    };

    // const handleRecaptchaChange = () : void => {
    //
    // };

    return <Box py={12}>
        <Container maxW="800px">
            <Heading as="h2" variant="h2" textAlign="center" mb={8}>
                Subscribe for the latest updates from Soul Patts
            </Heading>
            <Formik
                validationSchema={SCHEMA}
                initialValues={INITIAL_VALUES}
                onSubmit={(values, { resetForm }) => {
                    submit(values, resetForm);
                }}>
                {
                    (({ handleSubmit, errors }) => {
                        return <Form onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit();
                        }} noValidate>
                            <Flex justifyContent="center">
                                {
                                    status !== 'success' ? <>
                                        <Flex minW="400px" direction="column">
                                            <Field as={Input}
                                                type="email"
                                                border="1px solid"
                                                borderColor="lightGrey2"
                                                px={4}
                                                h="60px"
                                                id="email"
                                                name="email"
                                                placeholder="Email Address"
                                                autoComplete="off" />
                                            {
                                                errors.email && <Text variant="error">{errors.email}</Text>
                                            }
                                        </Flex>
                                        <Button type="submit"
                                            background="skyBlue"
                                            color="white"
                                            py={0}
                                            h="60px"
                                            minW="120px">Subscribe</Button>
                                    </> : <Text>{message}</Text>
                                }
                            </Flex>
                        </Form>;
                    })
                }
            </Formik>
        </Container>
    </Box>;
};
