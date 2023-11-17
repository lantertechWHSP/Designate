import { ReactNode, useRef } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Flex, Grid, GridItem, AspectRatio } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import {AnimateTranslateUp} from "~/components/elements/animation/AnimateTranslateUp";

interface IHomePageImageGalleryBlock extends IBlock {
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageImageGalleryBlock:any = ({ imageMain, imageSide, imageSide2, background, paddingTop, paddingBottom }:IHomePageImageGalleryBlock) : ReactNode => {
    const ref = useRef(null)

    return (imageMain || imageSide || imageSide2) && <ContentBlock ref={ref} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Grid
            gap={8}
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'>
            <GridItem rowSpan={2} colSpan={1}>
                    <AspectRatio ratio={[652 / 672]} >
                        <Box backgroundImage={`url(${imageMain.url})`} backgroundSize="cover" />
                    </AspectRatio>
            </GridItem>
            <GridItem>
                <Box top="0" left="0" right="0" bottom="0" backgroundImage={`url(${imageSide.url})`} backgroundSize="cover" height="100%" />
            </GridItem>
            <GridItem>
                <Box top="0" left="0" right="0" bottom="0" backgroundImage={`url(${imageSide2.url})`} backgroundSize="cover" height="100%" />
            </GridItem>
        </Grid>
    </ContentBlock>;
};

export default HomePageImageGalleryBlock;
