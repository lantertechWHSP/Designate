import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { gutter } from '~/components/elements/grid/grid';
import { IImage } from '~/interfaces/util/image';
import StructuredContent from '~/components/StructuredContent';
import { IStructuredText } from '~/interfaces/util/structuredText';

interface IContentCardPanelBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    image?:IImage;
}

const ContentCardPanel:any = ({ title, description, image, containerWidth, paddingTop, paddingBottom }:IContentCardPanelBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" containerWidth={containerWidth} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex direction={['column', ,'row']}>
            <Flex width={['100%', ,'50%']} background="white" direction="column" p={[6, ,gutter * 2]}>
                {
                    title && <Heading as="h2" mb={4}>{title}</Heading>
                }
                {
                    description && <StructuredContent content={description} />
                }
            </Flex>
            <Box width={['100%', ,'50%']}
                position="relative"
                backgroundImage={image?.responsiveImage ? `url('${image.responsiveImage.src}')` : 'lightGrey'}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover">
                <Box paddingTop="66%" />
            </Box>
        </Flex>
    </ContentBlock>;
};

export default ContentCardPanel;
