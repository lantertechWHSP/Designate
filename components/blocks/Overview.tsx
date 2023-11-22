import {ReactNode} from 'react';
import {IBlock} from '~/interfaces/util/block';
import StructuredContent from "~/components/StructuredContent";
import ContentBlock from '~/components/blocks/Content';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import { Box, Heading } from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

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
    const subtitleColumnWidth:any = (() => {
        if(subtitle && isEmptyDocument(description)) {
            if(align === IOverviewAlign.Center) {
                return [ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths];
            }
            else if(align === IOverviewAlign.Left) {
                return [ColumnWidth.Full, , ,ColumnWidth.TenTwelfths, ColumnWidth.NineTwelfths];
            }
        }
        return [ColumnWidth.Full, , ,ColumnWidth.FiveTwelfths];
    })();

    const subtitleMarginOffset:any = (() => {
        if(subtitle && isEmptyDocument(description)) {
            return [0];
        }
        return [0, , ,ColumnWidth.Twelfth];
    })();

    return (subtitle || description) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row justify={align === IOverviewAlign.Center ? 'center' : '' } mb={[-4, , ,0]}>
            <Column width={subtitleColumnWidth} marginRight={subtitleMarginOffset}>
                {
                    !isEmptyDocument(subtitle) && <Box>
                            <Heading as="h2"
                                     fontSize={['28px', '32px', '36px']}
                                     lineHeight={['35px', '38px', '42px']}
                                     color="olive"
                                     fontWeight={500}
                                     mb={[4, , ,0]}>
                                <AnimateOverflow>
                                    <StructuredContent content={subtitle} />
                                </AnimateOverflow>
                            </Heading>
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                {
                    !isEmptyDocument(description) && <AnimateOverflow>
                        <StructuredContent content={description} />
                    </AnimateOverflow>
                }
            </Column>
        </Row>
    </ContentBlock>;
};

export default OverviewBlock;
