import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { IAccordionItem } from '~/components/blocks/Accordion/AccordionItem';
import { Heading, Box } from '@chakra-ui/react';

export interface IAccordionItem {
    title?:string;
    content?:string;
}

interface IAccordionBlock {
    title:string;
    items:IAccordionItem[];
}

const AccordionItem:any = ({ title, content, ...props }:IAccordionBlock) : ReactNode => {
    return <ContentBlock {...props}>
        {
            title && <Heading>
                {title}
            </Heading>
        }
        {
            content && <Box>
                {content}
            </Box>
        }
    </ContentBlock>
}

export default AccordionItem;
