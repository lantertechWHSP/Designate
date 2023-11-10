import {ReactNode} from 'react';
import {IBlock} from '~/interfaces/util/block';
import StructuredContent from "~/components/StructuredContent";
import ContentBlock from '~/components/blocks/Content';
import {Column, ColumnWidth, Row} from '~/components/elements/grid/grid';
import {IStructuredText} from '~/interfaces/util/structuredText';
import {isEmptyDocument} from 'datocms-structured-text-utils';
import { Box, Heading } from '@chakra-ui/react';

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
    const subtitleColumnWidth = (() => {
        if(subtitle && isEmptyDocument(description)) {
            if(align === IOverviewAlign.Center) {
                return [ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths];
            }
            else if(align === IOverviewAlign.Left) {
                return [ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.NineTwelfths];
            }
        }
        return [ColumnWidth.Full, , ,ColumnWidth.Half];
    })();

    return (subtitle || description) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row justify={align === IOverviewAlign.Center ? 'center' : '' } mb={[-4, , ,0]}>
            <Column width={subtitleColumnWidth}>
                {
                    !isEmptyDocument(subtitle) && <Box>
                        <Heading as="h2"
                            fontSize={['28px', '32px', '36px']}
                            lineHeight={['35px', '38px', '42px']}
                            color="olive"
                            fontWeight={500}
                            mb={[4, , ,0]}>
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
