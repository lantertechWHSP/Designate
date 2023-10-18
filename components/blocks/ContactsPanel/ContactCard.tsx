import { ReactNode } from 'react';
import { IContact } from '~/interfaces/models/contact';
import { Heading, Box } from '@chakra-ui/react';
import { Link } from "~/components/elements/link";

interface IContactCardProps extends IContact {
}

const ContactCard:any = ({ title, address, contactName, phone, phone2, email, email2, website }:IContactCardProps) : ReactNode => {
    return <Box>
        {
            title && <Heading as="h3" variant="h4" color="darkBrown" fontSize={['21px']} lineHeight={['26px']} mb={4}>
                {title}
            </Heading>
        }
        {
            address && <Box mb={4}>
                <Heading as="h4" variant="h5" mb={0}>
                    Address
                </Heading>
                <Box>
                    {address}
                </Box>
            </Box>
        }
        {
            contactName && <Box mb={4}>
                <Heading as="h4" variant="h5" mb={0}>
                    Contact
                </Heading>
                <Box>
                    {contactName}
                </Box>
            </Box>
        }
        {
            (phone || phone2) && <Box mb={4}>
                <Heading  as="h4" variant="h5" mb={0}>
                    Phone
                </Heading>
                {
                    phone && <Box>
                        <Link href={`tel:${phone}`} variant="underline">
                            {phone}
                        </Link>
                    </Box>
                }
                {
                    phone2 && <Box>
                        <Link href={`tel:${phone2}`} variant="underline">
                            {phone2}
                        </Link>
                    </Box>
                }
            </Box>
        }
        {
            (email || email2) && <Box mb={4}>
                <Heading as="h4" variant="h5" mb={0}>
                    Email
                </Heading>
                {
                    email && <Box>
                        <Link href={`mailto:${email}`} variant="underline">
                            {email}
                        </Link>
                    </Box>
                }
                {
                    email2 && <Box>
                        <Link href={`mailto:${email2}`} variant="underline">
                            {email2}
                        </Link>
                    </Box>
                }
            </Box>
        }
        {
            website && <Box mb={4}>
                <Heading as="h4" variant="h5" mb={0}>
                    Website
                </Heading>
                <Box>
                    <Link href={website} variant="underline">
                        {website}
                    </Link>
                </Box>
            </Box>
        }
    </Box>;
};

export default ContactCard;
