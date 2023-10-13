import {ReactNode} from 'react';
import {Box, Container, Flex, Text} from '@chakra-ui/react';
import {Link} from '~/components/elements/link';
import {IFooter as IDatoFooter} from '~/interfaces/layout/footer';
import Logo from "~/components/site/Logo";
import {IMenuLink} from '~/interfaces/models/menuLink';
import {MenuItemLink} from '~/components/elements/menuItemLink';
import {Column, ColumnValues, Row} from "~/components/elements/grid/grid";

interface IFooter extends IDatoFooter {
}

const Footer:any = ({ menu, address, email, phone, fax, linkedin, youtube, copyright }:IFooter) : ReactNode => {
    return <Box as="footer" background="black2" color="white" py={8}>
        <Container>
            <Row>
                <Column width={[ColumnValues.Full, ,ColumnValues.Half]}>
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
                </Column>
                <Column width={[ColumnValues.Full, ,ColumnValues.Quarter]}>
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
                <Column width={[ColumnValues.Full, ,ColumnValues.Quarter]}>
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
                </Column>
            </Row>
            <Row  mt={20}>
                <Column width={[ColumnValues.Full, ,ColumnValues.Half]}>
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
                <Column width={[ColumnValues.Full, ,ColumnValues.Quarter]}>
                    <Link href="/privacy-policy" color="whiteBlur" variant="siteFooter">
                        Privacy Policy
                    </Link>
                </Column>
                <Column width={[ColumnValues.Full, ,ColumnValues.Quarter]}>
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
