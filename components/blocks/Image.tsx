import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box } from '@chakra-ui/react';

interface IImageBlock {
    __typename?:string;
    id?:string;
    image?:any;
}

const ImageBlock = ({ image }:IImageBlock) : ReactNode => {
    return <ContentBlock>
        <Box>
            <DatoImage data={image.responsiveImage} />
        </Box>
    </ContentBlock>;
};

export default ImageBlock;
