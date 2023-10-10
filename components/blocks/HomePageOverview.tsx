import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Box, Heading, Grid, GridItem, Link } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';

interface IHomePageOverviewBlock {
    description?:string;
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
}

const HomePageOverviewBlock:any = ({ description, imageMain, imageSide, imageSide2 }:IHomePageOverviewBlock) : ReactNode => {
    return <ContentBlock background="lightGrey3" py={12}>
        <Box maxW="900" mx="auto" textAlign="center" mb={8}>
            {
                description && <Heading as="h2" fontSize={["26px"]} lineHeight={["36px"]} mb={8}>
                    {description}
                </Heading>
            }
            {
                <Link href="/our-history">Our Company</Link>
            }
        </Box>
        <Grid templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={8}>
            <GridItem rowSpan={2}>
                <Image image={imageMain} ratio={[ 1 / 1 ]} />
            </GridItem>
            <GridItem>
                <Image image={imageSide} ratio={[ 2.1 / 1]} />
            </GridItem>
            <GridItem>
                <Image image={imageSide2}  ratio={[ 2.1 / 1]}  />
            </GridItem>
        </Grid>
    </ContentBlock>;
};

export default HomePageOverviewBlock;
