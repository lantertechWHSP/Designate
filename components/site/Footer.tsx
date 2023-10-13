import { ReactNode } from 'react';
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { Link } from '~/components/elements/link';
import { IFooter as IDatoFooter } from '~/interfaces/layout/footer';
import Logo from "~/components/site/Logo";
import { IMenuLink } from '~/interfaces/models/menuLink';
import {MenuItemLink} from "~/components/elements/menuItemLink";

interface IFooter extends IDatoFooter {
}

const Footer:any = ({ menu, address, email, phone, fax, linkedin, youtube, copyright }:IFooter) : ReactNode => {
    return <Box as="footer" background="black2" color="white" py={8}>
        <Container>
            <Flex mx={-4}>
                <Box w={['100%', ,'50%']} px={4}>
                    <Flex direction="column">
                        {
                            (Array.isArray(menu) && menu.length > 0) && menu.map((item:IMenuLink, index:number) => {
                                return <Box key={index}
                                    mb={2}>
                                    <MenuItemLink
                                        variant="siteFooter"
                                        fontSize={['32px']}
                                        lineHeight={1.4}
                                        fontWeight={500}
                                        title={item.title}
                                        link={item.link}
                                        externalLink={item.externalLink} />
                                </Box>;
                            })
                        }
                    </Flex>
                </Box>
                <Box w={['100%', ,'25%']} px={4}>
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
                </Box>
                <Box w={['100%', ,'25%']} px={4}>
                    {
                        address && <Box mb={8}>
                            {address}
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
            </Flex>
            <Flex mx={-4} mt={20}>
                <Box w={['100%', ,'50%']} px={4}>
                    <Link
                        href="/"
                        sx={{
                            display: 'block',
                            width: '188px',
                            position: 'relative',
                            top: '-3px'
                        }}>
                        <Box as="span"
                            color="white">
                            <Logo />
                        </Box>
                    </Link>
                </Box>
                <Box w={['100%', ,'25%']} px={4}>
                    <Link href="/privacy-policy" color="whiteBlur" variant="siteFooter">
                        Privacy Policy
                    </Link>
                </Box>
                <Box w={['100%', ,'25%']} px={4}>
                    {
                        copyright && <Text mb={0} color="whiteBlur">
                            {copyright}
                        </Text>
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Footer;
