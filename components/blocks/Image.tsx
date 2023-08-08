import ContentBlock from "~/components/blocks/ContentBlock";
import { ReactNode } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box } from '@chakra-ui/react';

const ImageBlock = ({ image }) : ReactNode => {
    return <ContentBlock>
        <Box maxW={600} mx="auto">
            <DatoImage data={image.responsiveImage} />
        </Box>
    </ContentBlock>;
};

export default ImageBlock;
