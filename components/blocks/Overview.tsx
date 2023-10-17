import {ReactNode} from 'react';
import ContentBlock from '~/components/blocks/Content';
import { ChakraProps } from '@chakra-ui/system';
import { Heading, Text } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';

interface IOverviewBlock extends ChakraProps {
    subtitle?:string;
    description?:string;
}

const OverviewBlock:any = ({ subtitle, description }:IOverviewBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" py={8}>
        <Row>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                {
                    subtitle && <Heading as="h2"
                                         fontSize={['36px']}
                                         lineHeight={['42px']}
                                         color="darkBrown"
                                         fontWeight={500} mb={4}>
                        {subtitle}
                  </Heading>
                }
            </Column>
            <Column width={[ColumnWidth.Full, , ,ColumnWidth.Half]}>
                {
                    description && <Text fontSize={['19px']}
                                         m={0}
                                         lineHeight={['29px']}
                                         color="darkBrown">
                        {description}
                  </Text>
                }
            </Column>
        </Row>
    </ContentBlock>;
};

export default OverviewBlock;
