import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface AttributesListPanelItem {
    title?:string;
    content?:string;
    icon?:ISVGImage;
}

interface IAttributesListPanelBlock extends IBlock {
    title?:string;
    items:AttributesListPanelItem[];
}

const AttributesListPanelBlock:any = ({ title, items, paddingTop, paddingBottom, background }:IAttributesListPanelBlock) : ReactNode => {
    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, ,2, items.length > 4 ? 4 : items.length]} spacing={[6, ,8]}>
                {
                    items.map((item:AttributesListPanelItem, index:number) => {
                        return <Box key={index}>
                            {
                                (item.icon && item.icon.url) && <Box mb={4}>
                                    <AnimateOverflow>
                                        <img src={item.icon.url} alt={item.icon?.alt} />
                                    </AnimateOverflow>
                                </Box>
                            }
                            {
                                item.title && <Heading as="h3" fontSize={["21px"]} color="olive" fontWeight={700} mb={2}>
                                    <AnimateOverflow>
                                        {item.title}
                                    </AnimateOverflow>
                                </Heading>
                            }
                            {
                                item.content && <Box fontSize={['16px']} lineHeight={['24px']}>
                                    <AnimateOverflow>
                                        {item.content}
                                    </AnimateOverflow>
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
