import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';
import { ModularContent } from '~/components/ModularContent';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";

interface IPortfolioPanel {
    title?:string;
    content?:any;
}

interface IPortfolioPanelBlock extends IBlock {
    items:IPortfolioPanel[];
}

const PortfolioPanelBlock:any = ({ items }:IPortfolioPanelBlock) : ReactNode => {
    return (Array.isArray(items) && items.length > 0) && <ContentBlock>
        <Accordion allowToggle>
            {
                items.map((item:IPortfolioPanel, index:number) => {
                    return <AccordionItem key={index}>
                        <AccordionButton py={4}
                            borderTop="1px solid"
                            alignItems="flex-start"
                            textAlign="left"
                            borderColor="lightGrey2">
                            <Heading as="h3"
                                variant="h4"
                                fontSize={['21px']}
                                fontWeight={500}>
                                {item?.title}
                            </Heading>
                        </AccordionButton>
                        <AccordionPanel borderColor="lightGrey2" py={8}>
                            {
                                (Array.isArray(item.content) && item.content.length > 0) && <Row justify="center">
                                    <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                        <ModularContent content={item.content} contain={false} />
                                    </Column>
                                </Row>
                            }
                        </AccordionPanel>
                    </AccordionItem>;
                })
            }
        </Accordion>
    </ContentBlock>;
};

export default PortfolioPanelBlock;
