import { ReactNode, Fragment } from 'react';
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { IContact } from '~/interfaces/models/contact';
import { ChakraProps } from '@chakra-ui/system';
import ContactCard from '~/components/blocks/ContactsPanel/ContactCard';

interface IContactsPanelBlockProps extends ChakraProps {
    data: {
        contacts:IContact[];
    }
}

const ContactsPanelBlock:any = ({ data: { contacts } }:IContactsPanelBlockProps) : ReactNode => {
    return <ContentBlock py={8}>
        <Box mb={8}>
            <Heading as="h2" variant="sectionHeading">
                Contacts
            </Heading>
        </Box>
        {
            (Array.isArray(contacts) && contacts.length > 0) && <SimpleGrid columns={[1, , 3]}>
                {
                    contacts.map((contact:IContact, index:number) => {
                        return <Fragment key={index}><ContactCard {...contact} /></Fragment>
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
}

ContactsPanelBlock.getData = async () => {
    const result:IEvent[] = await doQuery(queries.contacts);
    return result;
};

export default ContactsPanelBlock;
