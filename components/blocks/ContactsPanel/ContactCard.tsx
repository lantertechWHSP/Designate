import { ReactNode } from 'react';
import { IContact } from '~/interfaces/models/contact';
import { Heading, Box } from '@chakra-ui/react';
import { Link } from "~/components/elements/link";

interface IContactCardProps extends IContact {
}

const ContactCard:any = ({ title, address, contactName, phone, phone2, email, email2, website }:IContactCardProps) : ReactNode => {
    return <Box>
        {
            title && <Heading as="h3" variant="h4" mb={4}>
                {title}
            </Heading>
        }
        {
            address && <Box mb={4}>
                <Heading as="h4" variant="h5">
                    Address
                </Heading>
                <Box color="steelBlue2">
                    {address}
                </Box>
            </Box>
        }
        {
            contactName && <Box mb={4}>
                <Heading as="h4" variant="h5">
                    Contact
                </Heading>
                <Box color="steelBlue2">
                    {contactName}
                </Box>
            </Box>
        }
        {
            (phone || phone2) && <Box mb={4}>
                <Heading  as="h4" variant="h5">
                    Phone
                </Heading>
                {
                    phone && <Box>
                        <Link href={`tel:${phone}`} color="steelBlue2">
                            {phone}
                        </Link>
                    </Box>
                }
                {
                    phone2 && <Box>
                        <Link href={`tel:${phone2}`} color="steelBlue2">
                            {phone2}
                        </Link>
                    </Box>
                }
            </Box>
        }
        {
            (email || email2) && <Box mb={4}>
                <Heading as="h4" variant="h5">
                    Email
                </Heading>
                {
                    email && <Box>
                        <Link href={`mailto:${email}`} color="steelBlue2">
                            {email}
                        </Link>
                    </Box>
                }
                {
                    email2 && <Box>
                        <Link href={`mailto:${email2}`} color="steelBlue2">
                            {email2}
                        </Link>
                    </Box>
                }
            </Box>
        }
        {
            website && <Box mb={4}>
                <Heading as="h4" variant="h5">
                    Website
                </Heading>
                <Box>
                    <Link href={website} color="steelBlue2">
                        {website}
                    </Link>
                </Box>
            </Box>
        }
    </Box>;
};

export default ContactCard;
