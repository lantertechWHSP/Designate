import { ReactNode } from 'react';
import { IContact } from '~/interfaces/models/contact';
import { Heading, Box } from '@chakra-ui/react';
import { UnderlineLink } from '~/components/elements/sectionLink';
import StructuredContent from "~/components/StructuredContent";
import { isEmptyDocument } from 'datocms-structured-text-utils';
import {AnimateOverflow} from "~/components/elements/animation/AnimateOverflow";

interface IContactCardProps extends IContact {
}

const ContactCard:any = ({ title, address, contactName, phone, phone2, email, email2, website, abn }:IContactCardProps) : ReactNode => {
    return <Box fontSize={['18px']} lineHeight={['32px']} color="olive">
        {
            title && <Heading as="h3" fontSize={['21px']} lineHeight={['26px']} mb={4}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            !isEmptyDocument(address) && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    <AnimateOverflow>
                        Address
                    </AnimateOverflow>
                </Heading>
                <Box>
                    <AnimateOverflow>
                        <StructuredContent content={address} />
                    </AnimateOverflow>
                </Box>
            </Box>
        }
        {
            contactName && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    <AnimateOverflow>
                        Contact
                    </AnimateOverflow>
                </Heading>
                <Box>
                    <AnimateOverflow>
                        {contactName}
                    </AnimateOverflow>
                </Box>
            </Box>
        }
        {
            (phone || phone2) && <Box mb={4}>
                <Heading  as="h4" mb={0}>
                    <AnimateOverflow>
                        Phone
                    </AnimateOverflow>
                </Heading>
                {
                    phone && <Box>
                        <AnimateOverflow>
                            <UnderlineLink href={`tel:${phone}`} fontWeight={500}>
                                {phone}
                            </UnderlineLink>
                        </AnimateOverflow>
                    </Box>
                }
                {
                    phone2 && <Box>
                        <AnimateOverflow>
                            <UnderlineLink href={`tel:${phone2}`} fontWeight={500}>
                                {phone2}
                            </UnderlineLink>
                        </AnimateOverflow>
                    </Box>
                }
            </Box>
        }
        {
            (email || email2) && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    <AnimateOverflow>
                        Email
                    </AnimateOverflow>
                </Heading>
                {
                    email && <Box>
                        <AnimateOverflow>
                            <UnderlineLink href={`mailto:${email}`} fontWeight={500}>
                                {email}
                            </UnderlineLink>
                        </AnimateOverflow>
                    </Box>
                }
                {
                    email2 && <Box>
                        <AnimateOverflow>
                            <UnderlineLink href={`mailto:${email2}`} fontWeight={500}>
                                {email2}
                            </UnderlineLink>
                        </AnimateOverflow>
                    </Box>
                }
            </Box>
        }
        {
            abn && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    <AnimateOverflow>
                        ABN
                    </AnimateOverflow>
                </Heading>
                <Box>
                    <AnimateOverflow>
                        <UnderlineLink href={`https://abr.business.gov.au/ABN/View?id=${abn}`} target="_blank" fontWeight={500}>
                            ABN: {abn}
                        </UnderlineLink>
                    </AnimateOverflow>
                </Box>
            </Box>
        }
        {
            website && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    <AnimateOverflow>
                        Website
                    </AnimateOverflow>
                </Heading>
                <Box>
                    <AnimateOverflow>
                        <UnderlineLink href={website} target="_blank" fontWeight={500}>
                            {website.replace(/^.*:\/\//i, '')}
                        </UnderlineLink>
                    </AnimateOverflow>
                </Box>
            </Box>
        }
    </Box>;
};

export default ContactCard;
