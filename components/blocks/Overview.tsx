import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Heading } from '@chakra-ui/react';

interface IOverviewBlockProps extends ChakraProps {
    subtitle?:string;
    description?:string;
}

const OverviewBlock:any = ({ subtitle, description }:IOverviewBlockProps) : ReactNode => {
    return <ContentBlock>
        {
            subtitle && <Heading as="h2" variant="h2">
                {subtitle}
            </Heading>
        }
        {
            description && <Box>
                {description}
            </Box>
        }

    </ContentBlock>;
};

export default OverviewBlock;
