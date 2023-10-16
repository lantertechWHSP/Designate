import { ReactNode } from 'react';
import ContentBlock, { ContainerWidth } from '~/components/blocks/Content';
import { ChakraProps } from '@chakra-ui/system';
import { SimpleGrid, Box, Heading, Text } from '@chakra-ui/react';

interface IObjectivePanelItem {
    title?:string;
    description?:string;
    annotation?:string;
}

interface IObjectivePanelBlock extends ChakraProps {
    items?:IObjectivePanelItem[];
    containerWidth?:ContainerWidth;
}

const ObjectivePanelBlock:any = ({ items, containerWidth }:IObjectivePanelBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth} py={4}>
        {
            (Array.isArray(items) && items.length > 0) && <Box background="ghostWhite" py={8}>
                <SimpleGrid columns={[1, , 3]}>
                    {
                        items.map((item:IObjectivePanelItem, index:number) => {
                            return <Box borderRight={[0,index < items.length - 1 ? "1px solid" : '' ]} borderColor={['lightGrey2', 'lightGrey2']} px={8} key={index}>
                                {
                                    item.title && <Heading as="h3"
                                        fontSize={['56px']}
                                        lineHeight={['56px']}
                                        color="darkBrownBlur">
                                        {item.title}
                                    </Heading>
                                }
                                {
                                    item.description && <Heading as="h4" fontSize={['28px']} lineHeight={['28px']} color="darkBrown">
                                        {item.description}
                                    </Heading>
                                }
                                {
                                    item.annotation && <Text color="darkBrown">
                                        {item.annotation}
                                    </Text>
                                }
                            </Box>;
                        })
                    }
                </SimpleGrid>
            </Box>
        }
    </ContentBlock>;
};

export default ObjectivePanelBlock;
