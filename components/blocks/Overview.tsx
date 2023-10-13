import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { ChakraProps } from '@chakra-ui/system';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';

interface IOverviewBlock extends ChakraProps {
    subtitle?:string;
    description?:string;
}

const OverviewBlock:any = ({ subtitle, description }:IOverviewBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" py={8}>
        <Flex mx={-4}>
            <Box w={['50%']} px={4}>
                {
                    subtitle && <Heading as="h2"
                        fontSize={['36px']}
                        lineHeight={['42px']}
                        color="darkBrown"
                        fontWeight={500} mb={4}>
                        {subtitle}
                    </Heading>
                }
            </Box>
            <Box w={['50%']} px={4}>
                {
                    description && <Text fontSize={['19px']}
                        lineHeight={['29px']}
                        color="darkBrown">
                        {description}
                    </Text>
                }
            </Box>
        </Flex>
    </ContentBlock>;
};

export default OverviewBlock;
