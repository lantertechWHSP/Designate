import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Box, Heading, Grid, GridItem, Link } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { IDatoImage } from '~/interfaces';

interface IHomePageOverviewBlockProps {
    description?:string;
    imageMain?:IDatoImage;
    imageSide?:IDatoImage;
    imageSide2?:IDatoImage;
}

const HomePageOverviewBlock = ({ description, imageMain, imageSide, imageSide2 }:IHomePageOverviewBlockProps) : ReactNode => {
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
