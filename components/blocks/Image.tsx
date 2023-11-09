import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';
import { Box, Text } from '@chakra-ui/react';
import { Column, Row, ColumnWidth } from '~/components/elements/grid/grid';

interface IImageBlock extends IBlock {
    title?:string;
    image:IImage;
}

const ImageBlock:any = ({ title, image, contain, containerWidth, background, paddingTop, paddingBottom  }:IImageBlock) : ReactNode => {
    return (title || image) && <ContentBlock contain={contain} containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            (image && image.responsiveImage) && <Box borderRadius="3px" overflow="hidden">
                <DatoImage data={image.responsiveImage} style={{
                    width: '100%',
                    maxWidth: 'unset'
                }} />
            </Box>
        }
        {
            title && <Row>
                <Column width={[ColumnWidth.Full, , ColumnWidth.NineTwelfths, ColumnWidth.EightTwelfths]}>
                    <Text as="small" display="block" variant="annotation" mt={2}>{title}</Text>
                </Column>
            </Row>
        }
    </ContentBlock>;
};

export default ImageBlock;
