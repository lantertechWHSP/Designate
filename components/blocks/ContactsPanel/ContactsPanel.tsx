import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { IContact } from '~/interfaces/models/contact';
import { ChakraProps } from '@chakra-ui/system';
import ContactCard from '~/components/blocks/ContactsPanel/ContactCard';

interface IContactsPanelBlock extends IBlock, ChakraProps {
    data: {
        contacts:IContact[];
    }
}

const ContactsPanelBlock:any = ({ data: { contacts } }:IContactsPanelBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite">
        <Box mb={8}>
            <Heading as="h2" variant="sectionHeading">
                Contacts
            </Heading>
        </Box>
        {
            (Array.isArray(contacts) && contacts.length > 0) && <SimpleGrid columns={[1, , , 3]}>
                {
                    contacts.map((contact:IContact, index:number) => {
                        return <Box key={index} mb={[index < contacts.length - 1 ? 4 : 0, , ,0]}><ContactCard {...contact} /></Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

ContactsPanelBlock.getData = async () => {
    const result:IEvent[] = await doQuery(queries.contacts);
    return result;
};

export default ContactsPanelBlock;
