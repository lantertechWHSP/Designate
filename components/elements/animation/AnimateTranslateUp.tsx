import { ReactNode, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useSpring, useTransform  } from 'framer-motion';
const MotionBox:any = motion(Box);

interface IAnimateTranslateUp {
    children?:any;
}

export const AnimateTranslateUp:any = ({ offset = 0, delay = 0, translateYPosition = 120, children }:IAnimateTranslateUp): ReactNode => {
    const elementRef = useRef();
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: [`${offset}px end`, 'end']
    });

    return <Box ref={elementRef} height="100%">
        <MotionBox height="100%" transition={{
            ease: [0.215, 0.61, 0.355, 1],
            duration: 0.5,
            delay: delay
        }}
        style={{
            translateY: useTransform(useSpring(scrollYProgress, {
                bounce: 0,
                mass: 0.3,
                stiffness: 50
            }), [0, 1], [`${translateYPosition}px`, '0px'])
        }}>
            {children}
        </MotionBox>
    </Box>
}
