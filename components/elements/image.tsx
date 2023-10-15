import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box, AspectRatio } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { IImage as IDatoImage } from '~/interfaces/util/image';

interface IImage extends ChakraProps {
    image?:IDatoImage;
    ratio?:number[];
    onClick?:() => any;
}

export const Image:any = ({ image, ratio, ...props }:IImage) : ReactNode => {
    return <Box {...props}>
        {
            image && image.responsiveImage ? <DatoImage data={image.responsiveImage} /> : <AspectRatio ratio={ratio} >
                <Box background="lightGrey" />
            </AspectRatio>
        }
    </Box>;
};
