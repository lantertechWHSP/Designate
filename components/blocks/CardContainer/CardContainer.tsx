import { ReactNode } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import Card from "~/components/blocks/CardContainer/Card";
import ContentBlock from "~/components/blocks/ContentBlock";

const CardContainerBlock = ({ title, cards }) : ReactNode => {
    return <ContentBlock>
        {
            title && <Heading>
                title
            </Heading>
        }
        {
            (Array.isArray(cards) && cards.length > 0) && <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8]}>
                {
                    cards.map((card, index:number) => {
                        return <Box key={index}>
                            <Card {...card} />
                        </Box>
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default CardContainerBlock;
