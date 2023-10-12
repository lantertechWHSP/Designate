import { ReactNode } from 'react';
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { Link } from '~/components/elements/link';
import { IFooter } from '~/interfaces/layout/footer';

interface ISiteFooter extends IFooter {
}

const SiteFooter:any = ({ address, email, phone, fax, linkedin, youtube, copyright }:ISiteFooter) : ReactNode => {
    return <Box as="footer" background="ghostWhite" color="steelBlue3" py={8}>
        <Container>
            <Box>
                <a href="/" style={{
                    display: 'block',
                    width: '130px',
                    marginBottom: '16px'
                }}>
                    <img src="/images/logo.svg" alt="Logo" />
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
                        Website by <Link href="https://designate.com.au" variant="siteFooter">Designate</Link>
                    </Box>
                </Box>
                <Box flex={1} />
                <Box minWidth={['100%', '200px']}>
                    {
                        phone && <Box>
                            <Link href={`tel:${phone}`} variant="siteFooter">
                                {phone}
                            </Link>
                        </Box>
                    }
                    {
                        fax && <Box>
                            <Link href={`tel:${fax}`} variant="siteFooter">
                                {fax}
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
                    {
                        (linkedin || youtube) && <Flex w={['100%', '250px']} mx={-2}>
                            {
                                linkedin && <Box px={2}>
                                    <Link href={linkedin} variant="siteFooter">
                                        Linkedin
                                    </Link>
                                </Box>
                            }
                            {
                                youtube && <Box px={2}>
                                    <Link href={youtube} variant="siteFooter">
                                        YouTube
                                    </Link>
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

export default SiteFooter;
