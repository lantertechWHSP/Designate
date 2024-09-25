import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from "datocms-structured-text-utils";
import StructuredContent from '~/components/StructuredContent';
import ContentBlock from '~/components/blocks/Content';
import { IImage } from '~/interfaces/util/image';
import { Image } from '~/components/elements/image';

interface  ICommunityInvestmentPanelBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    items?:ICommunityInvestmentItem[];
}

interface ICommunityInvestmentItem {
    image?:IImage;
    description?:IStructuredText;
}

const CommunityInvestmentPanelBlock:any = ({ title, description, items, paddingTop, paddingBottom, background }: ICommunityInvestmentPanelBlock) : ReactNode => {
    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            description && <Box mb={8}>
                <AnimateOverflow>
                    {
                        !isEmptyDocument(description) && <StructuredContent content={description} />
                    }
                </AnimateOverflow>
            </Box>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, 1, ,2]} spacingX={[8]} spacingY={[6, ,8]}>
                {
                    items.map((item:ICommunityInvestmentItem, index:number) => {
                        return <Box key={index}>
                            {
                                item.image && <Box width={['240px']} mb={4}>
                                    <Image image={item.image} />
                                </Box>
                            }
                            {
                                !isEmptyDocument(item.description) && <StructuredContent content={item.description} />
                            }
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default CommunityInvestmentPanelBlock;
