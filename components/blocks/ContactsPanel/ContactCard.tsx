import { IContact } from '~/interfaces/models/contact';
import { Heading, Box } from '@chakra-ui/react';
import { DatoLink } from "~/components/elements/DatoLink";

interface IContactCardProps extends IContact {
}

const ContactCard = ({ title, address, contactName, phone, phone2, email, email2, website }:IContactCardProps) => {
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
                        <DatoLink href={`tel:${phone}`} color="steelBlue2">
                            {phone}
                        </DatoLink>
                    </Box>
                }
                {
                    phone2 && <Box>
                        <DatoLink href={`tel:${phone2}`} color="steelBlue2">
                            {phone2}
                        </DatoLink>
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
                    <DatoLink href={`mailto:${email}`} color="steelBlue2">
                        {email}
                    </DatoLink>
                  </Box>
                }
                {
                    email2 && <Box>
                        <DatoLink href={`mailto:${email2}`} color="steelBlue2">
                            {email2}
                        </DatoLink>
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
                    <DatoLink href={website} color="steelBlue2">
                        {website}
                    </DatoLink>
                </Box>
            </Box>
        }
    </Box>
}

export default ContactCard;
