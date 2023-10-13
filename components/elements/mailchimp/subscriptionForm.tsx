import React, { ReactNode, useState } from 'react';
import { Heading, Container, Flex, Button, Input, Text, Box, Divider } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
// import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';

// @TODO Subscription form and ReCaptcha
export const SubscriptionForm:any = () : ReactNode => {
    // const RECAPTCHA_API_KEY:string = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY;

    // @ts-ignore
    const SCHEMA:any = yup.object({
        email: yup.string().required("Please enter an Email Address").email("Please enter a valid Email Address")
    });

    const INITIAL_VALUES:any = {
        email: ''
    };

    const [isAttemptedSubmit, setIsAttemptedSubmit] = useState<boolean>(false);
    const [status, setStatus] = useState<string>();
    const [message, setMessage] = useState<string>();

    const submit:any = (values, resetForm) : void => {
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

    return <Box background="black2" pt={8}>
        <Container>
            <Flex mx={-4} mb={2}>
                <Box width={['100%', ,'50%']} px={4}>
                    <Heading as="h2" variant="sectionHeading" color="white">
                        Subscribe for the latest updates
                    </Heading>
                    <Text color="whiteBlur">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </Box>
                <Flex width={['100%', ,'50%']} px={4} justify="flex-end">
                    <Formik
                        validationSchema={SCHEMA}
                        initialValues={INITIAL_VALUES}
                        onSubmit={(values, { resetForm }) => {
                            submit(values, resetForm);
                        }}>
                        {
                            (({ handleSubmit, errors, touched }) => {
                                return <Form onSubmit={(event) => {
                                    setIsAttemptedSubmit(true);
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
                                                        background="transparent"
                                                        sx={(errors.email && (touched.email && isAttemptedSubmit))  ? {
                                                            color: 'error',
                                                            borderColor: '#f1767488'
                                                        } : {}}
                                                        borderColor="whiteBlur"
                                                        px={4}
                                                        _placeholder={{
                                                            color: 'whiteBlur'
                                                        }}
                                                        color="white"
                                                        h="50px"
                                                        id="email"
                                                        name="email"
                                                        borderRadius="4px"
                                                        mr={4}
                                                        placeholder="Email Address"
                                                        autoComplete="off" />
                                                    {
                                                        (errors.email && (touched.email && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.email.toString()}</Text>
                                                    }
                                                </Flex>
                                                <Button type="submit"
                                                    background="white"
                                                    color="black"
                                                    py={0}
                                                    h="50px"
                                                    borderRadius="4px"
                                                    minW="180px">Subscribe</Button>
                                            </> : <Flex minHeight="48px" align="center">
                                                <Text color="white" mb={0}>{message}</Text>
                                            </Flex>
                                        }
                                    </Flex>
                                </Form>;
                            })
                        }
                    </Formik>
                </Flex>
            </Flex>
            <Divider borderColor="whiteBlur" />
        </Container>
    </Box>;
};
