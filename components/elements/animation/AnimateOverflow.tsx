import { ReactNode, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { baseAnimationBezier } from '~/lib/theme/theme';
import { useAnimate, useMotionValueEvent, useScroll } from 'framer-motion';

interface IAnimateOverflowText {
    children?:any;
    delay?:number;
}

export const AnimateOverflow:any = ({ children, delay = 0 }:IAnimateOverflowText) : ReactNode => {
    const [scope, animate] = useAnimate();
    const { scrollYProgress } = useScroll({
        target: scope,
        offset: [`start end`, 'end']
    });

    const [overflowStyle, setOverflowStyle] = useState({
        overflow: 'hidden'
    });

    const [isAnimated, setIsAnimated] = useState(false);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if(!isAnimated && latest >= 0) {
            animate(scope.current, {
                transform: 'translateY(0)'
            }, {
                ease: baseAnimationBezier,
                duration: 0.5,
                delay: delay
            });

            setIsAnimated(true);

            setTimeout(() => {
                setOverflowStyle({
                    overflow: 'unset'
                });
            }, 500 + (delay * 1000));
        }
    });

    return <Box style={overflowStyle}>
        <Box ref={scope} sx={{
            transform: 'translateY(100%)'
        }}>
            {children}
        </Box>
    </Box>;
};
