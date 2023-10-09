import { ReactNode } from 'react';
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { DatoLink } from '~/components/elements/DatoLink';

const Footer:any = ({ address, email, phone, fax, linkedin, youtube, copyright }:any) : ReactNode => {
    return <Box as="footer" background="ghostWhite" color="steelBlue3" py={8}>
        <Container>
            <Box>
                <a href="/" style={{
                    display: 'block',
                    width: '130px',
                    marginBottom: '16px'
                }}>
                    {/*<img src="/images/logo.svg" alt="Logo" />*/}
                </a>
            </Box>
            <Flex>
                <Box>
                    {
                        copyright && <Box>
                            <Text as="span">
                                {copyright}
                            </Text>
                        </Box>
                    }
                    <Box>
                        Website by <DatoLink href="https://designate.com.au" variant="siteFooter">Designate</DatoLink>
                    </Box>
                </Box>
                <Box flex={1} />
                <Box minWidth={['100%', '200px']}>
                    {
                        phone && <Box>
                            <DatoLink href={`tel:${phone}`} variant="siteFooter">
                                {phone}
                            </DatoLink>
                        </Box>
                    }
                    {
                        fax && <Box>
                            <DatoLink href={`tel:${fax}`} variant="siteFooter">
                                {fax}
                            </DatoLink>
                        </Box>
                    }
                    {
                        email && <Box>
                            <DatoLink href={`mailto:${email}`} variant="siteFooter">
                                {email}
                            </DatoLink>
                        </Box>
                    }
                    {
                        (linkedin || youtube) && <Flex w={['100%', '250px']} mx={-2}>
                            {
                                linkedin && <Box px={2}>
                                    <DatoLink {...linkedin} variant="siteFooter">
                                        Linkedin
                                    </DatoLink>
                                </Box>
                            }
                            {
                                youtube && <Box px={2}>
                                    <DatoLink {...youtube} variant="siteFooter">
                                        YouTube
                                    </DatoLink>
                                </Box>
                            }
                        </Flex>
                    }
                </Box>
                <Box w={['100%', '250px']}>
                    {
                        address && <Box>
                            {address}
                        </Box>
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Footer;
