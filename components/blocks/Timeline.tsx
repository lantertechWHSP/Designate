import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { isEmptyDocument } from "datocms-structured-text-utils";
import { Flex, Box, Heading } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";
import { AnimateOverflow } from "~/components/elements/animation/AnimateOverflow";
import {AnimateOpacity} from "~/components/elements/animation/AnimateOpacity";

interface ITimelineBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    itemsTitle?:string;
    items?:ITimelineItem[];
}

interface ITimelineItem {
    date?:string;
    description?:IStructuredText;
}

const TimelineBlock:any = ({ title, description, items, itemsTitle, paddingTop, paddingBottom }:ITimelineBlock) : ReactNode => {
    return (title || !isEmptyDocument(description) || (Array.isArray(items) && items.length > 0) || itemsTitle) && <ContentBlock className="TimelineBlock" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            <Column width={[ColumnWidth.Full, , , ,ColumnWidth.Half]}>
                {
                    title && <Heading as="h2" variant="sectionHeading" mb={4}>
                        <AnimateOverflow>
                            {title}
                        </AnimateOverflow>
                    </Heading>
                }
                {
                    !isEmptyDocument(description) && <Box mb={[8, , , ,0]}>
                        <AnimateOpacity>
                            <StructuredContent content={description} />
                        </AnimateOpacity>
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, , , ,ColumnWidth.Half]}>
                {
                    itemsTitle && <Heading as="h3" variant="h2" mb={4}>
                        <AnimateOverflow>
                            {itemsTitle}
                        </AnimateOverflow>
                    </Heading>
                }
                {
                    Array.isArray(items) && items.length > 0 && <AnimateOpacity>
                        <Box background="olive" color="white" borderTopRightRadius="40px" p={8}>
                            <Flex height="20px">
                                <Box width="50px" />
                                <Box width="50px" position="relative">
                                    <Box width="1px" height="100%" background="deepStone" position="absolute" left="50%" />
                                </Box>
                                <Box flex={1} />
                            </Flex>
                            {
                                items.map((item:ITimelineItem, index:number) => {
                                    return <Flex key={index}>
                                        <Box width="50px">
                                            {item.date}
                                        </Box>
                                        <Box width="50px" position="relative">
                                            <Box width="1px" height="100%" background="deepStone" position="absolute" left="50%" />
                                            <Box width="24px" height="24px" position="absolute" left="50%" transform="translateX(-50%)" background={index === items.length - 1 ? 'deepStone' : 'olive'} borderRadius="50%" border="1px solid" borderColor="deepStone" top="1px" />
                                        </Box>
                                        <Box flex={1}>
                                            {
                                                !isEmptyDocument(item.description) && <Box mb={index === items.length - 1 ? 0 : 4}>
                                                    <StructuredContent content={item.description} />
                                                </Box>
                                            }
                                        </Box>
                                    </Flex>;
                                })
                            }
                            <Flex height="20px">
                                <Box width="50px" />
                                <Box width="50px" position="relative">
                                    <Box width="1px" height="100%" background="deepStone" position="absolute" left="50%" />
                                </Box>
                                <Box flex={1} />
                            </Flex>
                        </Box>
                    </AnimateOpacity>
                }
            </Column>
        </Row>
    </ContentBlock>;
};

export default TimelineBlock;
