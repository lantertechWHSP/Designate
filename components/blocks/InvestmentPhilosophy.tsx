import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { IImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';

interface InvestmentPhilosophyItem {
    title?:string;
    content?:string;
    icon?:IImage;
}

interface IInvestmentPhilosophyBlock extends ChakraProps {
    items:InvestmentPhilosophyItem[];
}

const InvestmentPhilosophyBlock:any = ({ items, ...props }:IInvestmentPhilosophyBlock) : ReactNode => {
    return <ContentBlock {...props} py={8}>
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, , 3]} spacing={[0, 8]}>
                {
                    items.map((item:InvestmentPhilosophyItem, index:number) => {
                        return <Box key={index}>
                            {
                                item.icon && <Box mb={4}>
                                    <Image image={item.icon} width="30px" height="30px" ratio={[1 / 1]} />
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
