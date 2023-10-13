import { ReactNode, Fragment } from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { ILink } from '~/interfaces/util/link';
import { SectionLink } from '~/components/elements/sectionLink';

interface ISeeAlsoItem {
    title?:string;
    description?:string;
    link:ILink;
}

interface ISeeAlsoPanelBlock {
    title?:string;
    items?:ISeeAlsoItem[];
}

const SeeAlsoItem:any = ({ title, description, link }:ISeeAlsoItem) : ReactNode => {
    return <Box bg="white" borderTop="1px solid" borderColor="darkBrownBlur" py={4}>
        {
            title && <Heading as="h3" fontSize={['24px']} fontWeight={700} mb={2}>
                {title}
            </Heading>
        }
        {
            description && <Text mb={12}>
                {description}
            </Text>
        }
        {
            link && <SectionLink {...link}>
                Read More
            </SectionLink>
        }
    </Box>;
};

const SeeAlsoPanelBlock:any = ({ items }:ISeeAlsoPanelBlock) : ReactNode => {
    return <ContentBlock py={8}>
        {
            <Heading variant="sectionHeading" as="h2" mb={8}>
                See Also
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, 2, 4]} spacing={[0, 8]}>
                {
                    items.map((item:ISeeAlsoItem, index:number) => {
                        return <Fragment key={index}>
                            <SeeAlsoItem {...item} />
                        </Fragment>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default SeeAlsoPanelBlock;
