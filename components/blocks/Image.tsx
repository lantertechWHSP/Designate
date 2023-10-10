import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';
import { ChakraProps } from '@chakra-ui/system';

interface IImageBlock extends ChakraProps {
    image:IImage;
}

const ImageBlock:any = ({ image, ...props }:IImageBlock) : ReactNode => {
    return <ContentBlock {...props} mb={8}>
        <DatoImage data={image.responsiveImage} style={{
            width: '100%',
            maxWidth: 'unset'
        }} />
    </ContentBlock>;
};

export default ImageBlock;
