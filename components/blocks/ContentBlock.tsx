import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

const ContentBlock = ({ contain = true, children }) : ReactNode => {
    const Content = () : ReactNode => {
        return <Box>
            {children}
        </Box>;
    };

    return contain ?
        <Container>
            <Content />
        </Container>
        : <Content />;
};

export default ContentBlock;
