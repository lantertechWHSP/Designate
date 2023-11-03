import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';

interface AttributesListPanelItem {
    title?:string;
    content?:string;
    icon?:ISVGImage;
}

interface IAttributesListPanelBlock extends IBlock {
    title?:string;
    items:AttributesListPanelItem[];
}

const AttributesListPanelBlock:any = ({ title, items, paddingTop, paddingBottom }:IAttributesListPanelBlock) : ReactNode => {
    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,8]}>
                {title}
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, ,2, items.length > 4 ? 4 : items.length]} mb={-8} spacing={[0, 0, 8, 8]}>
                {
                    items.map((item:AttributesListPanelItem, index:number) => {
                        return <Box key={index} mb={8}>
                            {
                                (item.icon && item.icon.url) && <Box mb={4}>
                                    <img src={item.icon.url} alt={item.icon?.alt} width="90px" height="60px" />
                                </Box>
                            }
                            {
                                item.title && <Heading as="h3" fontSize={["21px"]} color="olive" fontWeight={700} mb={2}>
                                    {item.title}
                                </Heading>
                            }
                            {
                                item.content && <Box fontSize={['16px']} lineHeight={['24px']}>
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

export default AttributesListPanelBlock;
