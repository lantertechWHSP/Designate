import { ReactNode, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { baseAnimationBezier } from '~/lib/theme/theme';

const MotionBox:any = motion(Box);

interface IAnimateOpacity {
    children?:any;
    delay?:number;
}

export const AnimateOpacity:any = ({children, delay = 0 }:IAnimateOpacity) : ReactNode => {
    const elementRef = useRef();
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: [`start end`, 'end']
    });

    return <MotionBox ref={elementRef} transition={{
        ease: baseAnimationBezier,
        duration: 1,
        delay: delay
    }}
                      style={{
                          opacity: useTransform(useSpring(scrollYProgress, {
                              bounce: 0,
                              mass: 0.3,
                              stiffness: 50
                          }), [0, 1], ['0', '1'])
                      }}>
        {children}
    </MotionBox>
}
