import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { baseAnimationBezier } from '~/lib/theme/theme';

const MotionBox:any = motion(Box);

interface IAnimateOpacity {
    children?:any;
    delay?:number;
}

export const AnimateOpacity:any = ({children, delay = 0 }:IAnimateOpacity) : ReactNode => {
    return <MotionBox transition={{
        ease: baseAnimationBezier,
        duration: 1,
        delay: delay
    }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1.01 }}
              viewport={{ once: true }}>
        {children}
    </MotionBox>
}
