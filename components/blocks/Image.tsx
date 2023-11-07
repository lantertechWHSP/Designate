import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';
import { Text } from '@chakra-ui/react';

interface IImageBlock extends IBlock {
    title?:string;
    image:IImage;
}

const ImageBlock:any = ({ title, image, contain, containerWidth, background, paddingTop, paddingBottom  }:IImageBlock) : ReactNode => {
    return (title || image) && <ContentBlock contain={contain} containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            (image && image.responsiveImage) && <DatoImage data={image.responsiveImage} style={{
                width: '100%',
                maxWidth: 'unset'
            }} />
        }
        {
            title && <Text as="small" display="block" variant="annotation" mt={2}>{title}</Text>
        }
    </ContentBlock>;
};

export default ImageBlock;
