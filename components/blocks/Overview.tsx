import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import StructuredContent from "~/components/StructuredContent";
import ContentBlock from '~/components/blocks/Content';
import { Heading, Box } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';

interface IOverviewBlock extends IBlock, ChakraProps {
    subtitle?:any;
    description?:any;
}

const OverviewBlock:any = ({ subtitle, description, paddingTop, paddingBottom }:IOverviewBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            <Column width={[ColumnWidth.Full, , ,subtitle && !description ? ColumnWidth.ThreeQuarters : ColumnWidth.Half]}>
                {
                    subtitle && <Heading as="h2"
                        fontSize={['36px']}
                        lineHeight={['42px']}
                        color="darkBrown"
                        fontWeight={500}
                        pb={[4, , ,0]}>
                        <StructuredContent content={subtitle} />
                    </Heading>
                }
            </Column>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                {
                    description && <Box
                        fontSize={['19px']}
                        lineHeight={['29px']}
                        color="darkBrown">
                        <StructuredContent content={description} />
                    </Box>
                }
            </Column>
        </Row>
    </ContentBlock>;
};

export default OverviewBlock;
