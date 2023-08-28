import { Image as DatoImage } from 'react-datocms';
import { Box, AspectRatio } from '@chakra-ui/react';

// Wrapper of image with fallback background
export const Image = ({ image, ratio }) => {
    return <>
        {
            image ? <DatoImage data={image.responsiveImage} /> : <AspectRatio ratio={ratio}>
                <Box background="grey" />
            </AspectRatio>
        }
    </>
}
