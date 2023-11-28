import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { ILink} from '~/interfaces/util/link';
import { SectionLink } from '~/components/elements/sectionLink';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';


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
    return (title || description || link) && <Flex direction={['row', ,'column']} align={['center', ,'unset']} borderTop="1px solid" borderColor="oliveBlur2" py={4}>
        {
            title && <Heading as="h3" fontSize={['24px']} fontWeight={700} mb={[0, ,2]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            description && <Text display={['none', ,'block']} mb={[6, ,12]}>
                <AnimateOverflow>
                    {description}
                </AnimateOverflow>
            </Text>
        }
        {
            <Box flex={1} display={['block', ,'none']} />
        }
        {
            link && <AnimateOverflow>
                <SectionLink {...link}>
                    Read More
                </SectionLink>
            </AnimateOverflow>
        }
    </Flex>;
};

const SeeAlsoPanelBlock:any = ({ items, background, paddingTop, paddingBottom }:ISeeAlsoPanelBlock) : ReactNode => {
    return (Array.isArray(items) && items.length > 0) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Heading variant="sectionHeading" as="h2" mb={[4, ,6, 8]}>
            <AnimateOverflow>
                See Also
            </AnimateOverflow>
        </Heading>
        <Row>
            {
                items.map((item:ISeeAlsoItem, index:number) => {
                    return <Column key={index} width={[ColumnWidth.Full, , ColumnWidth.Half, ColumnWidth.OneQuarter]}>
                        <SeeAlsoItem {...item} />
                    </Column>;
                })
            }
        </Row>
    </ContentBlock>;
};

export default SeeAlsoPanelBlock;
