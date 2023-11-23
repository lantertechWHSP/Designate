import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Image as DatoImage } from 'react-datocms';
import { IImage } from '~/interfaces/util/image';
import { Box, Text } from '@chakra-ui/react';
import { Column, Row, ColumnWidth } from '~/components/elements/grid/grid';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IImageBlock extends IBlock {
    title?:string;
    image:IImage;
}

const ImageBlock:any = ({ title, image, contain, containerWidth, background, paddingTop, paddingBottom  }:IImageBlock) : ReactNode => {
    return (title || image) && <ContentBlock className="ImageBlock" contain={contain} containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            (image && image.responsiveImage) && <AnimateOpacity>
                <Box borderRadius="3px" overflow="hidden">
                    <DatoImage data={image.responsiveImage} style={{
                        width: '100%',
                        maxWidth: 'unset'
                    }} />
                </Box>
            </AnimateOpacity>
        }
        {
            title && <Row>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.NineTwelfths]}>
                    <AnimateOverflow>
                        <Text as="small" display="block" variant="caption" mt={2}>
                            {title}
                        </Text>
                    </AnimateOverflow>
                </Column>
            </Row>
        }
    </ContentBlock>;
};

export default ImageBlock;
