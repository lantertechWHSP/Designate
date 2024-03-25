import { ReactNode} from 'react';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { Link} from '~/components/elements/link';
import { IFooter as IDatoFooter} from '~/interfaces/layout/footer';
import Logo from '~/components/site/Logo';
import { IMenuLink } from '~/interfaces/models/menuLink';
import { MenuItemLink } from '~/components/elements/menuItemLink';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import StructuredContent from '~/components/StructuredContent';
import { isEmptyDocument } from 'datocms-structured-text-utils';

interface IFooter extends IDatoFooter {
}

const Footer:any = ({ menu, address, email, phone, fax, linkedin, youtube, copyright, privacyPolicyDocument }:IFooter) : ReactNode => {
    return <Box as="footer" background="charcoal2" color="white" py={['40px', ,'50px', '60px']}>
        <Container>
            <Row>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]} mb={[4, ,0]} display={['none', 'block']}>
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
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]} fontSize={['18px']}>
                    <Row>
                        <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]} order={[2, , ,1]}>
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
                                privacyPolicyDocument?.document?.url && <Box>
                                    <Link target="_blank" variant="siteFooter" href={privacyPolicyDocument?.document?.url}>Privacy Policy</Link>
                                </Box>
                            }
                        </Column>
                        <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}  mb={[4, , ,0]}  order={[1, , ,2]}>
                            {
                                !isEmptyDocument(address) && <Box mb={[4, ,8]}>
                                    <StructuredContent content={address} />
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
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]} order={[2, , 1]}>
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
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]} mb={[8, ,0]} order={[1, ,2]} fontSize={['16px']} lineHeight={['24px']}>
                    <Row>
                        <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]}>
                            {
                                copyright && <Text mb={0} color="whiteBlur">
                                    {copyright}
                                </Text>
                            }
                        </Column>
                        <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]}>
                            <Box color="whiteBlur">
                                Created by <Link href="https://designate.com.au" target="_blank" borderBottom="1px solid">Designate</Link>
                            </Box>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
    </Box>;
};

export default Footer;
