import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, {getTextColor} from '~/components/blocks/Content';
import { Heading, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface IAccordionBlock extends IBlock {
    title?:string;
    items?:IAccordionItem[];
}

interface IAccordionItem {
    title?:string;
    content?:string;
}

const AccordionBlock:any = ({ title, background, textColor, items }:IAccordionBlock) : ReactNode => {
    const selectedTextColor:any = getTextColor(textColor);

    const borderColor:any = selectedTextColor === 'white' ? 'whiteBlur2' : 'borderColor';

    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} color={textColor} py={8}>
        {
            title && <Box mb={8}>
                <Heading as="h2" variant="sectionHeading" color={selectedTextColor}>
                    {title}
                </Heading>
            </Box>
        }
        {
            (Array.isArray(items) && items.length > 0) && <Accordion allowToggle>
                {
                    items.map((item:IAccordionItem, index:number) => {
                        return <AccordionItem key={index}>
                            {({ isExpanded }) => (
                                <>
                                    <AccordionButton py={4}
                                        borderTop="1px solid"
                                        alignItems="center"
                                        textAlign="left"
                                        color={selectedTextColor}
                                        borderColor={borderColor}>
                                        <Heading as="h3"
                                            variant="h4"
                                            color={selectedTextColor}
                                            fontSize={['21px']}
                                            fontWeight={500}>
                                            {item?.title}
                                        </Heading>
                                        <Box flex={1} />
                                        <Box transition="transform 300ms linear"
                                            transform={isExpanded ? 'rotate(180deg)' : ''}>
                                            <Icon icon={Icons.ChevronDown} />
                                        </Box>
                                    </AccordionButton>
                                    <AccordionPanel borderTop="1px solid" borderColor={borderColor} py={4}>
                                        {item?.content}
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>;
                    })
                }
            </Accordion>
        }
    </ContentBlock>;
};

export default AccordionBlock;
