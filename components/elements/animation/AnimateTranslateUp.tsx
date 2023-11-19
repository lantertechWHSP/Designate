import { ReactNode, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { baseAnimationBezier } from '~/lib/theme/theme';
const MotionBox:any = motion(Box);

interface IAnimateTranslateUp {
    offset?:number;
    delay?:number;
    translateYPosition?:number;
    children?:any;
}

export const AnimateTranslateUp:any = ({ children, offset = 0, delay = 0, translateYPosition = 90 }:IAnimateTranslateUp): ReactNode => {
    const elementRef = useRef();
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: [`${offset}px end`, 'end']
    });

    return <MotionBox ref={elementRef} transition={{
            ease: baseAnimationBezier,
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
}
