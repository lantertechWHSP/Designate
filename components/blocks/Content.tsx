import {ReactNode} from 'react';
import {Box, Container} from '@chakra-ui/react';
import {ChakraProps} from '@chakra-ui/system';
import {Column, ColumnWidth, Row} from "~/components/elements/grid/grid";

export enum ContainerWidth {
    Default = 'Default',
    Wide = 'Wide',
    Narrow = 'Narrow',
}

interface IContentBlock extends ChakraProps {
    contain?:boolean;
    children?:any;
    containerWidth?:ContainerWidth;
}

const ContentBlock:any = ({ contain = true, containerWidth = ContainerWidth.Default, children, ...props }:IContentBlock) : ReactNode => {
    let columnWidth:ColumnWidth;

    switch(containerWidth) {
        case ContainerWidth.Wide : columnWidth = ColumnWidth.TenTwelfths; break;
        case ContainerWidth.Narrow : columnWidth = ColumnWidth.EightTwelfths; break;
        default : columnWidth = ColumnWidth.Full;
    }

    return <Box {...props}>
        {
            contain ? <Container>
                {
                    (containerWidth !== ContainerWidth.Default) ? <Row justify={['center']}>
                        <Column width={[ColumnWidth.Full, , columnWidth]}>
                            {children}
                        </Column>
                    </Row> : <>{children}</>
                }
            </Container> : <Box>
                {children}
            </Box>
        }
    </Box>;
};

export default ContentBlock;
