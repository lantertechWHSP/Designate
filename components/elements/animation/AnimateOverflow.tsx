import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { baseAnimationBezier } from '~/lib/theme/theme';

const MotionBox:any = motion(Box);

interface IAnimateOverflowText {
    children?:any;
    delay?:number;
}

export const AnimateOverflow:any = ({ children, delay = 0 }:IAnimateOverflowText) : ReactNode => {
    return <Box overflow="hidden">
        <MotionBox transition={{
                ease: baseAnimationBezier,
                duration: 0.5,
                delay: delay
        }}
               initial={{ translateY: '100%' }}
               whileInView={{ translateY: '0' }}
               viewport={{ once: true }}>
            {children}
        </MotionBox>
    </Box>
}
