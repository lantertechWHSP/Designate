import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, { getTextColor} from '~/components/blocks/Content';
import { Heading, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import StructuredContent from "~/components/StructuredContent";
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import {AnimateOverflow} from "~/components/elements/animation/AnimateOverflow";

interface IAccordionBlock extends IBlock {
    title?:string;
    items?:IAccordionItem[];
    contentColumnWidth?:ColumnWidth;
}

export interface IAccordionItem {
    title?:string;
    content?:IStructuredText;
}

const AccordionBlock:any = ({ title, background, textColor, items, paddingBottom, contentColumnWidth = null }:IAccordionBlock) : ReactNode => {
    const selectedTextColor:any = getTextColor(textColor);
    const bodyTextColor:any = selectedTextColor === 'olive' ? 'steel' : 'white';
    const borderColor:any = selectedTextColor === 'white' ? 'whiteBlur2' : 'borderColor';

    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} color={textColor} paddingBottom={paddingBottom} py={8}>
        {
            title && <Heading as="h2" variant="sectionHeading" color={selectedTextColor} mb={['40px', ,'50px', '60px']}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
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
                                        minHeight="64px"
                                        color={selectedTextColor}
                                        borderColor={borderColor}>
                                        <Heading as="h3"
                                            variant="h4"
                                            color={selectedTextColor}
                                            fontSize={['21px']}
                                            lineHeight={['26px']}
                                            fontWeight={500} mb={0} mr={4}>
                                            <AnimateOverflow>
                                                {item?.title}
                                            </AnimateOverflow>
                                        </Heading>
                                        <Box flex={1} />
                                        <Box transition="transform 300ms linear"
                                            transform={isExpanded ? 'rotate(180deg)' : ''}>
                                            <Icon icon={Icons.ChevronDown} />
                                        </Box>
                                    </AccordionButton>
                                    <AccordionPanel color={bodyTextColor} pt={4} pb={8}>
                                        {
                                            !isEmptyDocument(item?.content) && <>
                                                {
                                                    contentColumnWidth ? <Row>
                                                        <Column width={contentColumnWidth}>
                                                            <StructuredContent content={item.content} />
                                                        </Column>
                                                    </Row> : <StructuredContent content={item.content} />
                                                }
                                            </>
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
