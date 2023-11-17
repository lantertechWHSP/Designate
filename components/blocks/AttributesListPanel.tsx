import { ReactNode, Fragment } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import {AnimateTranslateUp} from "~/components/elements/animation/AnimateTranslateUp";

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
                {title}
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, ,2, items.length > 4 ? 4 : items.length]} spacing={[6, ,8]}>
                {
                    items.map((item:AttributesListPanelItem, index:number) => {
                        return <Fragment key={index}>
                            <AnimateTranslateUp offset={(60 * index)}>
                                <Box>
                                    {
                                        (item.icon && item.icon.url) && <Box mb={4}>
                                            <img src={item.icon.url} alt={item.icon?.alt} />
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
                                </Box>
                            </AnimateTranslateUp>
                        </Fragment>
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default AttributesListPanelBlock;
