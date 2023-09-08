import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';

export enum ContainerWidth {
    Narrow = 'narrow',
    Wide = 'wide',
    Default = 'default'
}

interface IContentBlockProps extends ChakraProps {
    contain?:boolean;
    children?:any;
    containerWidth?:ContainerWidth;
}

const ContentBlock:any = ({ contain = true, containerWidth = ContainerWidth.Default, children, ...props }:IContentBlockProps) : ReactNode => {
    return <Box {...props}>
        {
            contain ? <Container maxW={`container.narrow`}>
                {children}
            </Container> : <Box>
                {children}
            </Box>
        }
    </Box>;
};

export default ContentBlock;
