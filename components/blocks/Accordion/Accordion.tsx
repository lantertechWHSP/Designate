import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { Heading, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';

interface IAccordionBlock {
    title?:string;
    items?:IAccordionItem[];
}

interface IAccordionItem {
    title?:string;
    content?:string;
}

const AccordionBlock:any = ({ title, items, ...props }:IAccordionBlock) : ReactNode => {
    return <ContentBlock {...props} background="steelBlue" color="white" py={8}>
        {
            title && <Box mb={8}>
                <Heading as="h2" variant="sectionHeading">
                    {title}
                </Heading>
            </Box>
        }
        {
            (Array.isArray(items) && items.length > 0) && <Accordion allowToggle>
                {
                    items.map((item:IAccordionItem, index:number) => {
                        return <AccordionItem key={index}>
                            <AccordionButton py={4}
                                borderTop="1px solid"
                                borderColor="white">
                                <Heading as="h3"
                                    variant="h4"
                                    fontWeight={400}>
                                    {item?.title}
                                </Heading>
                            </AccordionButton>
                            <AccordionPanel borderTop="1px solid"
                                py={4}>
                                {item?.content}
                            </AccordionPanel>
                        </AccordionItem>;
                    })
                }
            </Accordion>
        }
    </ContentBlock>;
};

export default AccordionBlock;
