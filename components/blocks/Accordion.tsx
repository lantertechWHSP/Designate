import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, {getTextColor} from '~/components/blocks/Content';
import { Heading, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';

interface IAccordionBlock extends IBlock {
    title?:string;
    items?:IAccordionItem[];
}

interface IAccordionItem {
    title?:string;
    content?:string;
}

const AccordionBlock:any = ({ title, background, textColor, items }:IAccordionBlock) : ReactNode => {
    const selectedColor:any = getTextColor(textColor);

    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} color={textColor} py={8}>
        {
            title && <Box mb={8}>
                <Heading as="h2" variant="sectionHeading" color={selectedColor}>
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
                                alignItems="flex-start"
                                textAlign="left"
                                borderColor={getTextColor(selectedColor)}>
                                <Heading as="h3"
                                    variant="h4"
                                    fontSize={['21px']}
                                    fontWeight={500}>
                                    {item?.title}
                                </Heading>
                            </AccordionButton>
                            <AccordionPanel borderTop="1px solid" borderColor={selectedColor} py={4}>
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
