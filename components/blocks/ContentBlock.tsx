import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

const ContentBlock = ({ contain = true, children }) : ReactNode => {
    return contain ?
        <Container>
            {children}
        </Container>
        : <Box>
            {children}
        </Box>;
};

export default ContentBlock;
