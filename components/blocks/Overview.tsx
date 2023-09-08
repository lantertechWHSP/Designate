import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Heading } from '@chakra-ui/react';

interface IOverviewBlockProps extends ChakraProps {
    subtitle?:string;
    description?:string;
}

const OverviewBlock:any = ({ subtitle, description }:IOverviewBlockProps) : ReactNode => {
    return <ContentBlock background="lightGrey3" py={12}>
        <Box maxW="900px">
            {
                subtitle && <Heading as="h2" variant="h2" fontWeight={400} mb={4}>
                    {subtitle}
              </Heading>
            }
            {
                description && <Box color="steelBlue">
                    {description}
              </Box>
            }
        </Box>
    </ContentBlock>;
};

export default OverviewBlock;
