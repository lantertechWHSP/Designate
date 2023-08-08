import { ReactNode } from 'react';
import { Container, Flex, Box, Link } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";
import { Icon, Icons } from "~/components/icon/icon";

const Footer = ({ address, email, phone, fax, linkedin }) : ReactNode => {
    return <Box as="footer" style={{
        borderTop: '1px solid #ccc',
        background: '#f0f0f0',
    }} py={4} mt={4}>
        <Container>
            <Flex>
                <Box width={200}>
                    <Link href="/">Home</Link>
                </Box>
                <Box px={4}>
                    <StructuredContent content={address?.value} />
                    {
                        phone && <Box>
                            Phone: <Link href={`tel:${phone}`}>{phone}</Link>
                        </Box>
                    }
                    {
                        fax && <Box>
                            Fax: <Link href={`fax:${fax}`}>{fax}</Link>
                        </Box>
                    }
                    {
                        email && <Box>
                            <Link href={`mailto:${email}`}>{email}</Link>
                        </Box>
                    }
                </Box>
                <Box px={4}>
                    {
                        linkedin && <Box>
                            <Link href={linkedin} style={{ display: 'inline-block' }}>
                                <Icon icon={Icons.Linkedin} w={30} h={30} />
                            </Link>
                        </Box>
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Footer;
