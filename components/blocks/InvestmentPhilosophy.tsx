import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';

interface InvestmentPhilosophyItem {
    title?:string;
    content?:string;
    icon?:ISVGImage;
}

interface IInvestmentPhilosophyBlock extends IBlock {
    title?:string;
    items:InvestmentPhilosophyItem[];
}

const InvestmentPhilosophyBlock:any = ({ title, items, paddingTop, paddingBottom }:IInvestmentPhilosophyBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={8}>
                {title}
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, ,2, items.length > 4 ? 4 : items.length]} spacing={[0, 0, 8, 8]}>
                {
                    items.map((item:InvestmentPhilosophyItem, index:number) => {
                        return <Box key={index}>
                            {
                                (item.icon && item.icon.url) && <Box mb={4}>
                                    <img src={item.icon.url} alt={item.icon?.alt} width="90px" height="60px" />
                                </Box>
                            }
                            {
                                item.title && <Heading as="h3" variant="h4" mb={2}>
                                    {item.title}
                                </Heading>
                            }
                            {
                                item.content && <Box>
                                    {item.content}
                                </Box>
                            }
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default InvestmentPhilosophyBlock;
