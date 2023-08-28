import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box } from '@chakra-ui/react';

const ImageBlock = ({ image }:any) : ReactNode => {
    return <ContentBlock>
        <Box>
            <DatoImage data={image.responsiveImage} />
        </Box>
    </ContentBlock>;
};

export default ImageBlock;
