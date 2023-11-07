import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import StructuredContent from "~/components/StructuredContent";
import ContentBlock from '~/components/blocks/Content';
import { Heading, Box } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from 'datocms-structured-text-utils';

enum IOverviewAlign {
    Left = 'Left',
    Center = 'Center'
}

interface IOverviewBlock extends IBlock {
    subtitle?:IStructuredText;
    description?:IStructuredText;
    align?:IOverviewAlign
}

const OverviewBlock:any = ({ subtitle, description, paddingTop, paddingBottom, background, align }:IOverviewBlock) : ReactNode => {
    return (subtitle || description) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row justify={align === IOverviewAlign.Center ? 'center' : '' }>
            <Column width={[ColumnWidth.Full, , ,subtitle && isEmptyDocument(description) ? ColumnWidth.EightTwelfths : ColumnWidth.Half]}>
                {
                    !isEmptyDocument(subtitle) && <Box pr="50px">
                        <Heading as="h2"
                            fontSize={['28px', '32px', '36px']}
                            lineHeight={['35px', '38px', '42px']}
                            color="olive"
                            fontWeight={500}
                            pb={[4, , ,0]}>
                            <StructuredContent content={subtitle} />
                        </Heading>
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                {
                    !isEmptyDocument(description) && <StructuredContent content={description} />
                }
            </Column>
        </Row>
    </ContentBlock>;
};

export default OverviewBlock;
