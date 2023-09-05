import { ReactNode } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CardBlock, { ICardBlockProps } from '~/components/blocks/CardContainer/Card';
import ContentBlock from "~/components/blocks/Content";

interface ICardContainerBlockProps {
    title?:string;
    cards?:ICardBlockProps[];
}

const CardContainerBlock:any = ({ title, cards }:ICardContainerBlockProps) : ReactNode => {
    return <ContentBlock py={8}>
        {
            title && <Heading variant="sectionHeading" as="h2" mb={4}>
                {title}
            </Heading>
        }
        {
            (Array.isArray(cards) && cards.length > 0) && <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8]}>
                {
                    cards.map((card:ICardBlockProps, index:number) => {
                        return <Box key={index}>
                            <CardBlock {...card} />
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default CardContainerBlock;
