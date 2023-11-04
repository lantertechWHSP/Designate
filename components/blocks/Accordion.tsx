import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, {getTextColor} from '~/components/blocks/Content';
import { Heading, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import StructuredContent from "~/components/StructuredContent";

interface IAccordionBlock extends IBlock {
    title?:string;
    items?:IAccordionItem[];
}

interface IAccordionItem {
    title?:string;
    content?:IStructuredText;
}

const AccordionBlock:any = ({ title, background, textColor, items, paddingBottom }:IAccordionBlock) : ReactNode => {
    const selectedTextColor:any = getTextColor(textColor);

    const borderColor:any = selectedTextColor === 'white' ? 'whiteBlur2' : 'borderColor';

    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} color={textColor} paddingBottom={paddingBottom} py={8}>
        {
            title && <Heading as="h2" variant="sectionHeading" color={selectedTextColor} mb={[4, ,8]}>
                {title}
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <Accordion allowToggle borderBottom="1px solid"
                borderColor={borderColor}>
                {
                    items.map((item:IAccordionItem, index:number) => {
                        return <AccordionItem key={index}>
                            {({ isExpanded }) => (
                                <>
                                    <AccordionButton py={4}
                                        borderTop="1px solid"
                                        alignItems="center"
                                        textAlign="left"
                                        lineHeight="64px"
                                        height="64px"
                                        color={selectedTextColor}
                                        borderColor={borderColor}>
                                        <Heading as="h3"
                                            variant="h4"
                                            color={selectedTextColor}
                                            fontSize={['21px']}
                                            lineHeight={['26px']}
                                            fontWeight={500} margin={0}>
                                            {item?.title}
                                        </Heading>
                                        <Box flex={1} />
                                        <Box transition="transform 300ms linear"
                                            transform={isExpanded ? 'rotate(180deg)' : ''}>
                                            <Icon icon={Icons.ChevronDown} />
                                        </Box>
                                    </AccordionButton>
                                    <AccordionPanel borderTop="1px solid" borderColor={borderColor} py={4}>
                                        {
                                            !isEmptyDocument(item?.content) && <StructuredContent content={item.content} />
                                        }
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
