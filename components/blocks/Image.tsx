import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box } from '@chakra-ui/react';
import { IDatoImage } from '~/interfaces';

interface IImageBlockProps {
    image:IDatoImage;
}

const ImageBlock:Function = ({ image }:IImageBlockProps) : ReactNode => {
    return <ContentBlock>
        <Box>
            <DatoImage data={image.responsiveImage} />
        </Box>
    </ContentBlock>;
};

export default ImageBlock;
