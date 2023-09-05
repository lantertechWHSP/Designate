import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Box, Heading, Grid, GridItem } from '@chakra-ui/react';
import { DatoLink } from '~/components/elements/datoLink';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces';

interface IHomePageOverviewBlockProps {
    description?:string;
    imageMain?:IImage;
    imageSide?:IImage;
    imageSide2?:IImage;
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
                <DatoLink href="/our-history">Our Company</DatoLink>
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
