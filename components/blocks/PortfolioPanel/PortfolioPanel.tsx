import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, Box } from '@chakra-ui/react';
import { ModularContent } from '~/components/ModularContent';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Icon, Icons } from '~/components/elements/icon';

interface IPortfolioPanel {
    title?:string;
    content?:any;
}

interface IPortfolioPanelBlock extends IBlock {
    items:IPortfolioPanel[];
}

const PortfolioPanelBlock:any = ({ items, paddingBottom }:IPortfolioPanelBlock) : ReactNode => {
    return (Array.isArray(items) && items.length > 0) && <ContentBlock paddingBottom={paddingBottom}>
        <Accordion allowToggle defaultIndex={0} borderBottom="1px solid" borderColor="borderColor">
            {
                items.map((item:IPortfolioPanel, index:number) => {
                    return <AccordionItem key={index}>
                        {({ isExpanded }) => (
                            <>
                                <AccordionButton py={4}
                                                 lineHeight="80px"
                                                 height="80px"
                                                 boxSizing="border-box"
                                                 borderTop="1px solid"
                                                 alignItems="center"
                                                 textAlign="left"
                                                 borderColor="borderColor">
                                    <Heading as="h3"
                                             variant="h4"
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
                                <AccordionPanel borderColor="borderColor" py={8}>
                                    {
                                        (Array.isArray(item.content) && item.content.length > 0) && <Row justify="center">
                                            <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                                <ModularContent content={item.content} contain={false} />
                                            </Column>
                                      </Row>
                                    }
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>;
                })
            }
        </Accordion>
    </ContentBlock>;
};

export default PortfolioPanelBlock;
