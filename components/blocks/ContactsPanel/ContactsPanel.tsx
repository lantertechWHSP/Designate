import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { IEventBundle } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { IContact } from '~/interfaces/models/contact';
import ContactCard from '~/components/blocks/ContactsPanel/ContactCard';
import { orderBy as _orderBy } from 'lodash';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IContactsPanelBlock extends IBlock {
    title?:string;
    data: {
        contacts:IContact[];
    }
}

const ContactsPanelBlock:any = ({title, background, paddingTop, paddingBottom, data: { contacts }}:IContactsPanelBlock) : ReactNode => {
    return (Array.isArray(contacts) && contacts.length > 0 || title) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            Array.isArray(contacts) && contacts.length > 0 && <SimpleGrid columns={[1, , , 3]} spacing={[6, , ,8]}>
                {
                    _orderBy(contacts, ['ordinal'], ['asc']).map((contact:IContact, index:number) => {
                        return <Box key={index}><ContactCard {...contact} /></Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

ContactsPanelBlock.getData = async () => {
    const result:IEventBundle[] = await doQuery(queries.contacts);
    return result;
};

export default ContactsPanelBlock;
