import { ReactNode } from 'react';
import { IContact } from '~/interfaces/models/contact';
import { Heading, Box } from '@chakra-ui/react';
import { UnderlineLink } from '~/components/elements/sectionLink';

interface IContactCardProps extends IContact {
}

const ContactCard:any = ({ title, address, contactName, phone, phone2, email, email2, website }:IContactCardProps) : ReactNode => {
    return <Box fontSize={['18px']} lineHeight={['32px']} color="darkBrown">
        {
            title && <Heading as="h3" fontSize={['21px']} lineHeight={['26px']} mb={4}>
                {title}
            </Heading>
        }
        {
            address && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    Address
                </Heading>
                <Box>
                    {address}
                </Box>
            </Box>
        }
        {
            contactName && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    Contact
                </Heading>
                <Box>
                    {contactName}
                </Box>
            </Box>
        }
        {
            (phone || phone2) && <Box mb={4}>
                <Heading  as="h4" mb={0}>
                    Phone
                </Heading>
                {
                    phone && <Box>
                        <UnderlineLink href={`tel:${phone}`}>
                            {phone}
                        </UnderlineLink>
                    </Box>
                }
                {
                    phone2 && <Box>
                        <UnderlineLink href={`tel:${phone2}`}>
                            {phone2}
                        </UnderlineLink>
                    </Box>
                }
            </Box>
        }
        {
            (email || email2) && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    Email
                </Heading>
                {
                    email && <Box>
                        <UnderlineLink href={`mailto:${email}`}>
                            {email}
                        </UnderlineLink>
                    </Box>
                }
                {
                    email2 && <Box>
                        <UnderlineLink href={`mailto:${email2}`}>
                            {email2}
                        </UnderlineLink>
                    </Box>
                }
            </Box>
        }
        {
            website && <Box mb={4}>
                <Heading as="h4" mb={0}>
                    Website
                </Heading>
                <Box>
                    <UnderlineLink href={website}>
                        {website}
                    </UnderlineLink>
                </Box>
            </Box>
        }
    </Box>;
};

export default ContactCard;
