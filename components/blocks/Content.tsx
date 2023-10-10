import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';

export enum ContainerWidth {
    Default = null,
    Narrow = 'narrow',
    Wide = 'wide',
}

interface IContentBlock extends ChakraProps {
    contain?:boolean;
    children?:any;
    containerWidth?:ContainerWidth;
}

const ContentBlock:any = ({ contain = true, containerWidth = ContainerWidth.Default, children, ...props }:IContentBlock) : ReactNode => {
    return <Box {...props}>
        {
            contain ? <Container maxW={containerWidth}>
                {children}
            </Container> : <Box>
                {children}
            </Box>
        }
    </Box>;
};

export default ContentBlock;
