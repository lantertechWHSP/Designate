import { ReactNode, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform  } from 'framer-motion';
const MotionBox:any = motion(Box);

interface IAnimateTranslateUp {
    children?:any;
}

export const AnimateTranslateUp:any = ({ offset = 0, yOffsetPosition = 120, children }:IAnimateTranslateUp): ReactNode => {
    const elementRef = useRef();
    const { scrollY } = useScroll();

    return <Box ref={elementRef}>
        <MotionBox transition={{
            ease: [0.215, 0.61, 0.355, 1],
            duration: 0.5,
        }}
        style={{
            translateY: useTransform(scrollY, () => {
                if(elementRef.current) {
                    const position = ((elementRef.current.getBoundingClientRect().top) - window.innerHeight) + offset;

                    if(position < 0) {
                        return Math.max(0, yOffsetPosition + position);
                    }
                    else {
                        return yOffsetPosition;
                    }
                }
            })
        }}>
            {children}
        </MotionBox>
    </Box>
}
