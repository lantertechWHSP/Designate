import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Box, Heading, Grid, GridItem, Link } from '@chakra-ui/react';
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
    return <ContentBlock background="grey" py={12}>
        {
            description && <Box maxW="900" mx="auto" textAlign="center" mb={8}>
                <Heading as="h2" fontSize={["26px"]} fontWeight={500} lineHeight={["38px"]} mb={8}>
                    {description}
                </Heading>
                <SectionLink href="/about/our-company">
                    Our Company
                </SectionLink>
            </Box>
        }
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
