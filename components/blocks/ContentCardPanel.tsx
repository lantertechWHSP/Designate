import { ReactNode } from 'react';
import ContentBlock, { ContainerWidth } from '~/components/blocks/Content';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { gutter } from '~/components/elements/grid/grid';
import { IImage } from '~/interfaces/util/image';
import StructuredContent from '~/components/StructuredContent';

interface IContentCardPanelBlock {
    title?:string;
    description?:string;
    image?:IImage;
    containerWidth:ContainerWidth;
}

const ContentCardPanel:any = ({ title, description, image, containerWidth }:IContentCardPanelBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth} background="ghostWhite">
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
