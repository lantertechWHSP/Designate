import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { baseAnimationBezier } from '~/lib/theme/theme';

const MotionBox:any = motion(Box);

export const AnimateOverflowText:any = ({children, delay = 0}) : ReactNode => {
    return <Box overflow="hidden">
        <MotionBox transition={{
                    ease: baseAnimationBezier,
                    duration: 0.5,
                    delay: delay
        }}
               initial={{ translateY: '100%' }}
               whileInView={{ translateY: '0' }}>
            {children}
        </MotionBox>
    </Box>
}
