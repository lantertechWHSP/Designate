import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { IContact } from '~/interfaces/models/contact';
import ContactCard from '~/components/blocks/ContactsPanel/ContactCard';
import { orderBy as _orderBy } from 'lodash';

interface IContactsPanelBlock extends IBlock {
    data: {
        contacts:IContact[];
    }
}

const ContactsPanelBlock:any = ({ data: { contacts } }:IContactsPanelBlock) : ReactNode => {
    return (Array.isArray(contacts) && contacts.length > 0) && <ContentBlock background="ghostWhite">
        <Box mb={8}>
            <Heading as="h2" variant="sectionHeading">
                Contacts
            </Heading>
        </Box>
        <SimpleGrid columns={[1, , , 3]}>
            {
                _orderBy(contacts, ['ordinal'], ['asc']).map((contact:IContact, index:number) => {
                    return <Box key={index} mb={[index < contacts.length - 1 ? 4 : 0, , ,0]}><ContactCard {...contact} /></Box>;
                })
            }
        </SimpleGrid>
    </ContentBlock>;
};

ContactsPanelBlock.getData = async () => {
    const result:IEvent[] = await doQuery(queries.contacts);
    return result;
};

export default ContactsPanelBlock;
