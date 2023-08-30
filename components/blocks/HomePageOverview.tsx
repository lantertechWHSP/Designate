import ContentBlock from "~/components/blocks/Content";
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

const HomePageOverviewBlock = ({ description }:any) : ReactNode => {
    return <ContentBlock>
        !!!!
        {
            description && <Box>
                {description}
            </Box>
        }
    </ContentBlock>;
};

export default HomePageOverviewBlock;
