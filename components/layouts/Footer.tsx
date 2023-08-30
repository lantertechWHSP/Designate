import { ReactNode } from 'react';
import { Container, Flex, Text, Box, Link } from '@chakra-ui/react';

const Footer = ({ address, email, phone, _fax, _linkedin, copyright }) : ReactNode => {
    return <Box as="footer" background="ghostWhite" py={8}>
        <Container>
            <Flex h="60px" align="center">
                <Box>
                    <Link href="/" variant="siteFooter">WHSP</Link>
                    {
                        copyright && <Box>
                            <Text color="steelBlue">
                                {copyright}
                            </Text>
                        </Box>
                    }
                    Website by <Link href="https://designate.com.au">Designate</Link>
                </Box>
                <Box flex={1} />
                <Box>
                    {
                        phone && <Box>
                            <Link href={`tel:${phone}`} variant="siteFooter">
                                {phone}
                            </Link>
                        </Box>
                    }
                    {
                        email && <Box>
                            <Link href={`mailto:${email}`} variant="siteFooter">
                                {email}
                            </Link>
                        </Box>
                    }
                </Box>
                <Box>
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
