import { ReactNode } from 'react';
import { Container, Flex, Text, Box, Link } from '@chakra-ui/react';

const Footer = ({ _address, _email, _phone, _fax, _linkedin, copyright }) : ReactNode => {
    return <Box as="footer" background="ghostWhite" py={4}>
        <Container>
            <Flex h="60px" align="center">
                {
                    copyright && <Box>
                        <Text color="steelBlue">
                            {copyright}
                        </Text>
                    </Box>
                }
                <Box flex={1}>
                </Box>
                <Box>
                    <Link href="/privacy-policy" variant="siteFooter" px={4}>Privacy Policy</Link>
                    <Link href="/terms-of-use" variant="siteFooter" px={4}>Terms of Use</Link>
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Footer;
