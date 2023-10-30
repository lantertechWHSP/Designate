import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';
import { Text } from '@chakra-ui/react';

interface IImageBlock extends IBlock {
    image:IImage;
}

const ImageBlock:any = ({ image, containerWidth, paddingTop, paddingBottom }:IImageBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <DatoImage data={image.responsiveImage} style={{
            width: '100%',
            maxWidth: 'unset'
        }} />
        {
            (image && image?.responsiveImage && image.responsiveImage?.title) && <Text variant="annotation" mt={2} mb={0}>
                {image.responsiveImage?.title}
            </Text>
        }
    </ContentBlock>;
};

export default ImageBlock;
