import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

const ContentBlock = ({ contain = true, children, ...props }) : ReactNode => {
    return <Box {...props}>
        {
            contain ? <Container>
                {children}
            </Container> : {children}
        }
    </Box>
};

export default ContentBlock;
