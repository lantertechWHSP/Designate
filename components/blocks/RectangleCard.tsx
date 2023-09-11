import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import { ILink } from '~/interfaces/util/link';
import { IImage } from '~/interfaces/util/image';
import { Flex, Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { SectionLink }  from '~/components/elements/sectionLink';
import { Image } from '~/components/elements/image';

interface IReactangleCardBlockProps extends ChakraProps {
    annotation?:string;
    title?:string;
    description?:string;
    link?:ILink;
    image?:IImage;
}

const RectangleCardBlock:any = ({ annotation, title, description, link, image, ...props }:IReactangleCardBlockProps) : ReactNode => {
    return <ContentBlock {...props} py={8}>
        <SimpleGrid columns={[1, ,2]} spacing={[0]}>
            <Flex direction="column" background="lightGrey3">
                <Box p={8}>
                    {
                        annotation && <Box mb={12} fontWeight={500}>
                            {annotation}
                      </Box>
                    }
                    {
                        title && <Heading as="h2" variant="h3" mb={4}>
                            {title}
                      </Heading>
                    }
                    {
                        description && <Box color="steelBlue3">
                            {description}
                      </Box>
                    }
                    <Box flex="1" />
                    <SectionLink {...link}>
                        Read More
                    </SectionLink>
                </Box>
            </Flex>
            <Box>
                <Image image={image} ratio={[650 / 500]} />
            </Box>
        </SimpleGrid>
    </ContentBlock>
}

export default RectangleCardBlock;
