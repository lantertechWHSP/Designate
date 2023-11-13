import React, { ReactNode, useState } from 'react';
import { Heading, Container, Flex, Button, Input, Text, Box, Divider } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
// import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

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

    return <Box background="charcoal2">
        <Container>
            <Box py={['40px', ,'50px', '60px']}>
                <Row>
                    <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                        <Heading as="h2" variant="sectionHeading" color="white" mb={[4, 0]}>
                            Subscribe for the latest updates
                        </Heading>
                    </Column>
                    <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]} justify="flex-end">
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
                                        <Flex direction={['column', ,'row']} px={0} py={[0, 4, 4, 0]}  width={['100%', ,'80%', '100%']} justifyContent="center">
                                            {
                                                status !== 'success' ? <>
                                                    <Flex flex={1} direction="column">
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
                                                            borderRadius="3px"
                                                            placeholder="Email Address"
                                                            autoComplete="off" />
                                                        {
                                                            (errors.email && (touched.email && isAttemptedSubmit)) && <Text variant="error" mt={2} mb={0}>{errors.email.toString()}</Text>
                                                        }
                                                    </Flex>
                                                    <Button type="submit"
                                                        background="white"
                                                        color="charcoal"
                                                        py={0}
                                                        h="50px"
                                                        ml={[0, ,4]}
                                                        mt={[4, ,0]}
                                                        borderRadius="3px"
                                                        minW={['100%', ,'180px']} >Subscribe</Button>
                                                </> : <Flex minHeight="48px" align="center">
                                                    <Text color="white" mb={0}>{message}</Text>
                                                </Flex>
                                            }
                                        </Flex>
                                    </Form>;
                                })
                            }
                        </Formik>
                    </Column>
                </Row>
            </Box>
            <Divider borderColor="whiteBlur" />
        </Container>
    </Box>;
};
