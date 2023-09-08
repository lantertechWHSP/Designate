import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';
import { ChakraProps } from '@chakra-ui/system';

interface IImageBlockProps extends ChakraProps {
    image:IImage;
}

const ImageBlock:any = ({ image, ...props }:IImageBlockProps) : ReactNode => {
    return <ContentBlock {...props}>
        <DatoImage data={image.responsiveImage} width="100%" style={{
            maxWidth: 'unset'
        }} />
    </ContentBlock>;
};

export default ImageBlock;
