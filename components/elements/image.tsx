import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box, AspectRatio } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { IDatoImage } from '~/interfaces';

interface IImageProps extends ChakraProps {
    image?:IDatoImage;
    ratio?:number[];
    onClick?:() => any;
}

export const Image:any = ({ image, ratio, ...props }:IImageProps) : ReactNode => {
    return <Box {...props}>
        {
            image ? <DatoImage data={image.responsiveImage} /> : <AspectRatio ratio={ratio} >
                <Box background="lightGrey" />
            </AspectRatio>
        }
    </Box>;
};
