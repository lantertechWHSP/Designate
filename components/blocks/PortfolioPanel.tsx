import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton } from '@chakra-ui/react';
import { ModularContent } from '~/components/ModularContent';

interface IPortfolioPanel {
    title?:string;
    content?:any;
}

interface IPortfolioPanelBlock {
    items:IPortfolioPanel[];
}

const PortfolioPanelBlock:any = ({ items }:IPortfolioPanelBlock) : ReactNode => {

    return <ContentBlock py={[6, 8, 12]}>
        <Accordion allowToggle>
            {
                items.map((item:IPortfolioPanel, index:number) => {
                    const newContent:any[] = [];
                    item.content.map((content) => {
                        content['contain'] = false;
                        newContent.push(content);
                    });

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
                        <AccordionPanel borderColor="lightGrey2" py={4}>
                            {
                                (Array.isArray(newContent) && newContent.length > 0) && <ModularContent content={newContent} />
                            }
                        </AccordionPanel>
                    </AccordionItem>;
                })
            }
        </Accordion>
    </ContentBlock>;
};

export default PortfolioPanelBlock;
