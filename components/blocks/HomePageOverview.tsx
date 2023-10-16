import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import {SectionLink} from "~/components/elements/sectionLink";

interface IHomePageOverviewBlock {
    description?:string;
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageOverviewBlock:any = ({ description, imageMain, imageSide, imageSide2 }:IHomePageOverviewBlock) : ReactNode => {
    return <ContentBlock background="brownGrey" py={[6, 8, 12]}>
        {
            description && <Box maxW="900" mx="auto" textAlign="center" mb={[4, ,8]}>
                <Heading as="h2" fontSize={['20px', , ,'26px']} fontWeight={500} lineHeight={[1.45]} mb={[4, ,8]}>
                    {description}
                </Heading>
                <SectionLink href="/about/our-company">
                    Our Company
                </SectionLink>
            </Box>
        }
        <Flex direction="row" mx={[-2, -2, -4]} overflow="hidden">
            <Box px={[2, 2, 4]}>
                <Image image={imageMain} ratio={[1]} />
            </Box>
            <Box px={[2, 2, 4]} my={[-4, -4, -8]}>
                <Box py={[2, 2, 4]}>
                    <Image image={imageSide} ratio={[ 2 / 1 ]} />
                </Box>
                <Box py={[2, 2, 4]}>
                    <Image image={imageSide2}  ratio={[ 2 / 1 ]}  />
                </Box>
            </Box>
        </Flex>
    </ContentBlock>;
};

export default HomePageOverviewBlock;
