import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { gutter } from '~/components/elements/grid/grid';
import { IImage } from '~/interfaces/util/image';
import StructuredContent from '~/components/StructuredContent';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { boxShadow } from '~/lib/theme/theme';
import { isEmptyDocument } from 'datocms-structured-text-utils';

interface IContentCardPanelBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    image?:IImage;
}

const ContentCardPanel:any = ({ title, description, image, containerWidth, paddingTop, paddingBottom }:IContentCardPanelBlock) : ReactNode => {
    return (title || !isEmptyDocument(description) || image) && <ContentBlock background="ghostWhite" containerWidth={containerWidth} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex direction={['column', ,'row']} mx={[0, ,'-30px']}
            minHeight={['320px']}
            borderRadius="3px"
            boxShadow={boxShadow}
            overflow="hidden">
            <Flex width={['100%', ,'50%']} background="white" direction="column" p={[6, ,gutter * 2]}>
                {
                    title && <Heading as="h2" variant="h3" mb={4}>{title}</Heading>
                }
                {
                    !isEmptyDocument(description) && <Box color="grey" fontSize={['16px']} lineHeight={['26px']}>
                        <StructuredContent content={description} />
                    </Box>
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
