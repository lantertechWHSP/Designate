import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Flex, Divider } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';

interface IHomePageImageGalleryBlock extends IBlock {
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageImageGalleryBlock:any = ({ imageMain, imageSide, imageSide2 }:IHomePageImageGalleryBlock) : ReactNode => {
    return (imageMain || imageSide || imageSide2) && <ContentBlock background="oliveGrey">
        {
            (imageMain || imageSide || imageSide2) && <Flex direction="row" mx={[-2, -2, -4]} mt={6} overflow="hidden">
                <Box px={[2, 2, 4]} width={['100%', ,'50%']}>
                    <Image image={imageMain} ratio={[652 / 672]} borderRadius="3px" overflow="hidden" />
                </Box>
                <Box px={[2, 2, 4]} my={[-4, -4, -8]} width={['100%', ,'50%']}>
                    <Box py={[2, 2, 4]}>
                        <Image image={imageSide} ratio={[ 652 / 330 ]} borderRadius="3px" overflow="hidden" />
                    </Box>
                    <Box py={[2, 2, 4]}>
                        <Image image={imageSide2}  ratio={[ 652 / 330 ]} borderRadius="3px" overflow="hidden" />
                    </Box>
                </Box>
            </Flex>
        }
        <Divider mt={8} borderColor="oliveBlur2" />
    </ContentBlock>;
};

export default HomePageImageGalleryBlock;
