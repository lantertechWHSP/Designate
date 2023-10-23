import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';

interface IImageBlock extends IBlock, ChakraProps {
    image:IImage;
}

const ImageBlock:any = ({ image, containerWidth }:IImageBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth}>
        <DatoImage data={image.responsiveImage} style={{
            width: '100%',
            maxWidth: 'unset'
        }} />
    </ContentBlock>;
};

export default ImageBlock;
