import { ReactNode } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { ILink} from '~/interfaces/util/link';
import { SectionLink } from '~/components/elements/sectionLink';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

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
            description && <Text mb={[6, ,12]}>
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
    return <ContentBlock py={[6, 8, 12]}>
        {
            <Heading variant="sectionHeading" as="h2" mb={[4, ,8]}>
                See Also
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <Row>
                {
                    items.map((item:ISeeAlsoItem, index:number) => {
                        return <Column key={index} width={[ColumnWidth.Full, , ColumnWidth.Half, ColumnWidth.OneQuarter]}>
                            <SeeAlsoItem {...item} />
                        </Column>;
                    })
                }
            </Row>
        }
    </ContentBlock>;
};

export default SeeAlsoPanelBlock;
