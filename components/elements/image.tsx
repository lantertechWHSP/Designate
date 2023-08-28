import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box, AspectRatio } from '@chakra-ui/react';

interface IImage {
    image?:any;
    ratio?:number[]|number;
    onClick?:() => any;
}

// Wrapper of image with fallback background
export const Image = ({ image, ratio, onClick }:IImage) : ReactNode => {
    return <Box onClick={onClick}>
        {
            image ? <DatoImage data={image.responsiveImage} /> : <AspectRatio ratio={ratio} >
                <Box background="grey" />
            </AspectRatio>
        }
    </Box>;
};
