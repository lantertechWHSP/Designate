import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

const ContentBlock = ({ contain = true, children, ...props }:any) : ReactNode => {
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
