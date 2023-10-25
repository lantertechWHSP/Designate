import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, Flex, Divider } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import { SectionLink } from '~/components/elements/sectionLink';

interface IHomePageOverviewBlock extends IBlock {
    description?:string;
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageOverviewBlock:any = ({ description, imageMain, imageSide, imageSide2 }:IHomePageOverviewBlock) : ReactNode => {
    return (description || imageMain || imageSide || imageSide2) && <ContentBlock background="brownGrey">
        {
            description && <Box maxW="990px" mx="auto" textAlign="center" mt="10px" mb={[6, 8, 12]}>
                <Heading as="h2" fontSize={['20px', , ,'26px']} fontWeight={500} lineHeight={[1.45]} mb={[4, ,6]}>
                    {description}
                </Heading>
                <SectionLink href="/about/our-company" >
                    Our Company
                </SectionLink>
            </Box>
        }
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
        <Divider mt={8} borderColor="darkBrownBlur" />
    </ContentBlock>;
};

export default HomePageOverviewBlock;
