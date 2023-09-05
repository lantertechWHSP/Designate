import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';

interface IContentBlockProps extends ChakraProps {
    contain?:boolean;
    children?:any;
}

const ContentBlock = ({ contain = true, children, ...props }:IContentBlockProps) : ReactNode => {
    return <Box {...props}>
        {
            contain ? <Container>
                {children}
            </Container> : <Box>
                {children}
            </Box>
        }
    </Box>;
};

export default ContentBlock;
