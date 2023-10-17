import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';

interface InvestmentPhilosophyItem {
    title?:string;
    content?:string;
    icon?:ISVGImage;
}

interface IInvestmentPhilosophyBlock extends ChakraProps {
    title?:string;
    items:InvestmentPhilosophyItem[];
}

const InvestmentPhilosophyBlock:any = ({ title, items }:IInvestmentPhilosophyBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite"  py={8}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={8}>
                {title}
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, ,2, items.length > 4 ? 4 : items.length]} spacing={[4]}>
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
