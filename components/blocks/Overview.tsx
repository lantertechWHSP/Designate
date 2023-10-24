import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import StructuredContent from "~/components/StructuredContent";
import ContentBlock from '~/components/blocks/Content';
import { Heading, Box } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { IStructuredText } from '~/interfaces/util/structuredText';

interface IOverviewBlock extends IBlock {
    subtitle?:IStructuredText;
    description?:IStructuredText;
}

const OverviewBlock:any = ({ subtitle, description, paddingTop, paddingBottom }:IOverviewBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom} sx={{
        a: {
            borderBottom: '1px solid',
            borderColor: 'darkBrown'
        }
    }}>
        <Row>
            <Column width={[ColumnWidth.Full, , ,subtitle && !description ? ColumnWidth.ThreeQuarters : ColumnWidth.Half]}>
                {
                    subtitle && <Box pr="50px">
                        <Heading as="h2"
                                 fontSize={['28px', '32px', '36px']}
                                 lineHeight={['35px', '38px', '42px']}
                                 color="darkBrown"
                                 fontWeight={500}
                                 pb={[4, , ,0]}>
                            <StructuredContent content={subtitle} />
                        </Heading>
                    </Box>
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
