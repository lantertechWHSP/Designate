import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Grid, GridItem, AspectRatio } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';

interface IHomePageImageGalleryBlock extends IBlock {
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageImageGalleryBlock:any = ({ imageMain, imageSide, imageSide2, background, paddingTop, paddingBottom }:IHomePageImageGalleryBlock) : ReactNode => {
    return (imageMain || imageSide || imageSide2) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            <Grid
                gap={[4, 4, 8]}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(2, 1fr)">
                <GridItem rowSpan={2} borderRadius="3px" overflow="hidden">
                    <AspectRatio ratio={[652 / 672]}>
                        <AnimateOpacity delay={0.1}>
                            <Image image={imageMain} ratio={[652 / 672]} />
                        </AnimateOpacity>
                    </AspectRatio>
                </GridItem>
                <GridItem overflow="hidden" position="relative" borderRadius="3px">
                    <AnimateOpacity delay={0.2} height="100%" width="100%">
                        <Image position="absolute" top="0" image={imageSide} ratio={[ 652 / 332 ]} borderRadius="3px" overflow="hidden" />
                    </AnimateOpacity>
                </GridItem>
                <GridItem overflow="hidden" position="relative" borderRadius="3px">
                    <AnimateOpacity delay={0.3} height="100%" width="100%">
                        <Image position="absolute" top="0" image={imageSide2} ratio={[ 652 / 332 ]} borderRadius="3px" overflow="hidden" />
                    </AnimateOpacity>
                </GridItem>
            </Grid>
        }
    </ContentBlock>;
};

export default HomePageImageGalleryBlock;
