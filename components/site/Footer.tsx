import {ReactNode} from 'react';
import {Box, Container, Flex, Text} from '@chakra-ui/react';
import {Link} from '~/components/elements/link';
import {IFooter as IDatoFooter} from '~/interfaces/layout/footer';
import Logo from "~/components/site/Logo";
import {IMenuLink} from '~/interfaces/models/menuLink';
import {MenuItemLink} from '~/components/elements/menuItemLink';
import {Column, ColumnWidth, Row} from "~/components/elements/grid/grid";

interface IFooter extends IDatoFooter {
}

const Footer:any = ({ menu, address, email, phone, fax, linkedin, youtube, copyright }:IFooter) : ReactNode => {
    return <Box as="footer" background="black2" color="white" py={[6, 8, 12]}>
        <Container>
            <Row>
                <Column width={[ColumnWidth.Full, ColumnWidth.Half]} mb={[4, ,0]}>
                    <Flex direction="column">
                        {
                            (Array.isArray(menu) && menu.length > 0) && menu.map((item:IMenuLink, index:number) => {
                                return <Box key={index}>
                                    <MenuItemLink
                                        variant="siteFooter"
                                        fontSize={['28px', ,'32px']}
                                        lineHeight={1.6}
                                        fontWeight={500}
                                        title={item.title}
                                        link={item.link}
                                        externalLink={item.externalLink} />
                                </Box>;
                            })
                        }
                    </Flex>
                </Column>
                <Column width={[ColumnWidth.Full, ColumnWidth.Half]}>
                    <Row>
                        <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]} mb={[4, , ,0]} order={[2, , ,1]}>
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
                        </Column>
                        <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]} order={[1, , ,2]}>
                            {
                                address && <Box mb={[4, ,8]}>
                                    {address}
                                </Box>
                            }
                            {
                                (linkedin || youtube) && <Flex w={['100%', '250px']} mx={-2} display={['none', , ,'flex']}>
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
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row  mt={[8, ,20]}>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]} mb={[8, ,0]}>
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
                </Column>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.OneQuarter]}>
                    <Link href="/privacy-policy" color="whiteBlur" variant="siteFooter">
                        Privacy Policy
                    </Link>
                </Column>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.OneQuarter]}>
                    {
                        copyright && <Text mb={0} color="whiteBlur">
                            {copyright}
                        </Text>
                    }
                </Column>
            </Row>
        </Container>
    </Box>;
};

export default Footer;
