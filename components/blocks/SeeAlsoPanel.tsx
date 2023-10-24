import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, Text, Flex, Alert } from '@chakra-ui/react';
import { ILink} from '~/interfaces/util/link';
import { SectionLink } from '~/components/elements/sectionLink';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';


interface ISeeAlsoItem {
    title?:string;
    description?:string;
    link:ILink;
}

interface ISeeAlsoPanelBlock extends IBlock {
    title?:string;
    items?:ISeeAlsoItem[];
}

const SeeAlsoItem:any = ({ title, description, link }:ISeeAlsoItem) : ReactNode => {
    return (title || description || link) && <Flex direction={['row', ,'column']} align={['center', ,'unset']} borderTop="1px solid" borderColor="darkBrownBlur" py={4}>
        {
            title && <Heading as="h3" fontSize={['24px']} fontWeight={700} mb={[0, ,2]}>
                {title}
            </Heading>
        }
        {
            description && <Text display={['none', ,'block']} mb={[6, ,12]}>
                {description}
            </Text>
        }
        {
            <Box flex={1} display={['block', ,'none']} />
        }
        {
            link && <SectionLink {...link} mb={8}>
                Read More
            </SectionLink>
        }
    </Flex>;
};

const SeeAlsoPanelBlock:any = ({ items }:ISeeAlsoPanelBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite">
        {
            <Heading variant="sectionHeading" as="h2" mb={[4, ,8]}>
                See Also
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) ? <Row>
                {
                    items.map((item:ISeeAlsoItem, index:number) => {
                        return <Column key={index} width={[ColumnWidth.Full, , ColumnWidth.Half, ColumnWidth.OneQuarter]}>
                            <SeeAlsoItem {...item} />
                        </Column>;
                    })
                }
            </Row> : <Alert status="info" mt={4}>
                Nothing else to see…
            </Alert>
        }
    </ContentBlock>;
};

export default SeeAlsoPanelBlock;
