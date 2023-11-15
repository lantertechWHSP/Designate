import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { fontRoboto } from '~/pages/_fonts';
import { boxShadow } from '~/lib/theme/theme';

export const Tooltip:any = ({ children }) : ReactNode => {
    return <Box fontFamily={`${fontRoboto.style.fontFamily}`} fontSize="14px" borderRadius="3px" px={4} py={3} background={'rgba(255, 255, 255, 0.9)'} boxShadow={boxShadow} color="charcoal" minWidth="120px">
        {children}
    </Box>;
};
