import { ReactNode } from 'react';
import { Container, Flex, Box, Link } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";

const Footer = ({ address, email, phone, fax }) : ReactNode => {
    return <Box as="footer" style={{
        borderTop: '1px solid #ccc',
        background: '#f0f0f0',
    }} py={4} mt={4}>
        <Container>
            <Flex>
                <Box width={200}>
                    <Link href="/">Home</Link>
                </Box>
                <Box>
                    <StructuredContent content={address?.value} />
                    {
                        phone && <Box>
                            Phone: {phone}
                        </Box>
                    }
                    {
                        fax && <Box>
                            Fax: {fax}
                        </Box>
                    }
                    {
                        email && <Box>
                            {email}
                        </Box>
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Footer;
