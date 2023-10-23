import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import { SimpleGrid, Box, Heading, Text } from '@chakra-ui/react';
import { IPerson } from '~/interfaces/models/person';
import { Image } from '~/components/elements/image';

interface IPeoplePanelBlock extends IBlock, ChakraProps {
    contain?:boolean;
    people:IPerson[];
}

const PortfolioProfilesPanelBlock:any = ({ contain, people, paddingTop, paddingBottom }:IPeoplePanelBlock) : ReactNode => {
    return <ContentBlock contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            (Array.isArray(people) && people.length > 0) && <SimpleGrid columns={[1, , 3]} spacing={[0, 8]}>
                {
                    people.map((person:IPerson, index:number) => {
                        return <Box key={index}>
                            <Image image={person.image} ratio={[1 / 1]} mb={4} />
                            {
                                person.name && <Heading as="h3">
                                    {person.name}
                                </Heading>
                            }
                            {
                                person.companyPosition && <Text>
                                    {person.companyPosition}
                                </Text>
                            }
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default PortfolioProfilesPanelBlock;
