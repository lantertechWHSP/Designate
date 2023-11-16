import { ReactNode, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
const MotionBox:any = motion(Box);

interface ITextAnimate {
    children?:any;
}

export const TextAnimate:any = ({ delay = 0, children }:ITextAnimate): ReactNode => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });

    return <Box ref={ref}>
        <MotionBox transition={{
            ease: 'easeIn',
            delay: delay
        }}
        style={{
            translateY: useTransform(scrollYProgress, [0, 1], ['120px', '0px'])
        }}>
            {children}
        </MotionBox>
    </Box>
}
