import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading } from '@chakra-ui/react';

interface IOverviewBlock extends IBlock, ChakraProps {
}

const SustainabilityPanelBlock:any = ({  paddingTop, paddingBottom }:IOverviewBlock) : ReactNode => {
    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box>
            <Heading as="h2">
                Sustainability Panel
            </Heading>
        </Box>
    </ContentBlock>;
};

export default SustainabilityPanelBlock;
