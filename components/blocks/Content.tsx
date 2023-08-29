import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

interface IContentBlock {
    contain?:boolean;
    children?:any;
}

const ContentBlock = ({ contain = true, children, ...props }:IContentBlock) : ReactNode => {
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
