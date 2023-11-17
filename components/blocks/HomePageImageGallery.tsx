import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Flex } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import {AnimateOpacity} from "~/components/elements/animation/AnimateOpacity";

interface IHomePageImageGalleryBlock extends IBlock {
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageImageGalleryBlock:any = ({ imageMain, imageSide, imageSide2, background, paddingTop, paddingBottom }:IHomePageImageGalleryBlock) : ReactNode => {
    return (imageMain || imageSide || imageSide2) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            (imageMain || imageSide || imageSide2) && <Flex direction="row" mx={[-2, -2, -4]} overflow="hidden">
                <Box px={[2, 2, 4]} width={['100%', ,'50%']}>
                    <AnimateOpacity>
                        <Image image={imageMain} ratio={[652 / 672]} borderRadius="3px" overflow="hidden" />
                    </AnimateOpacity>
                </Box>
                <Box px={[2, 2, 4]} my={[-4, -4, -8]} width={['100%', ,'50%']}>
                    <Box py={[2, 2, 4]}>
                        <AnimateOpacity delay={0.5}>
                            <Image image={imageSide} ratio={[ 652 / 330 ]} borderRadius="3px" overflow="hidden" />
                        </AnimateOpacity>
                    </Box>
                    <Box py={[2, 2, 4]}>
                        <AnimateOpacity>
                            <Image image={imageSide2}  ratio={[ 652 / 330 ]} borderRadius="3px" overflow="hidden" />
                        </AnimateOpacity>
                    </Box>
                </Box>
            </Flex>
        }
    </ContentBlock>;
};

export default HomePageImageGalleryBlock;
