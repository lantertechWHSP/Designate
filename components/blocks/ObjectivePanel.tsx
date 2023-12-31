import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { SimpleGrid, Box, Heading, Text, Flex } from '@chakra-ui/react';

interface IObjectivePanelItem {
    title?:string;
    description?:string;
    annotation?:string;
}

interface IObjectivePanelBlock extends IBlock {
    items?:IObjectivePanelItem[];
}

const ObjectivePanelBlock:any = ({ items, containerWidth, paddingTop, paddingBottom }:IObjectivePanelBlock) : ReactNode => {
    return (Array.isArray(items) && items.length > 0) && <ContentBlock containerWidth={containerWidth} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box background="ghostWhite" py={8} minHeight="264px" boxSizing="border-box">
            <SimpleGrid columns={[1, , 1, items.length > 4 ? 4 : items.length]}>
                {
                    items.map((item:IObjectivePanelItem, index:number) => {
                        return <Flex direction={['row', , ,'column']} mb={[items.length - 1 === index ? 0 : 8, , ,0]} borderRight={[0, , ,index < items.length - 1 ? "1px solid" : '' ]} borderColor={['none', , ,'borderColor']} px={8} key={index}>
                            {
                                item.title && <Heading as="h3"
                                    minWidth={['60px', , ,'initial']}
                                    mr={[0, , ,4]}
                                    mb={[0, , ,2]}
                                    fontSize={['56px']}
                                    lineHeight={['56px']}
                                    color="oliveBlur2">
                                    {item.title}
                                </Heading>
                            }
                            {
                                (item.description || item.annotation) && <Box>
                                    {
                                        item.description && <Heading as="h4" fontSize={['28px']} lineHeight={['28px']} mb={1} letterSpacing="-0.56px" color="olive">
                                            {item.description}
                                        </Heading>
                                    }
                                    {
                                        item.annotation && <Text color="olive" m={0}>
                                            {item.annotation}
                                        </Text>
                                    }
                                </Box>
                            }
                        </Flex>;
                    })
                }
            </SimpleGrid>
        </Box>
    </ContentBlock>;
};

export default ObjectivePanelBlock;
