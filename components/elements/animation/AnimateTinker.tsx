import { ReactNode, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useScroll, useSpring } from 'framer-motion';
import { baseAnimationBezier } from '~/lib/theme/theme';
import { useAnimate, transform, useMotionValueEvent } from "framer-motion";

interface IAnimateTranslateUp {
    offset?:number;
    delay?:number;
    translateYPosition?:number;
    children?:any;
}

export const AnimateTinker:any = ({ children, offset = 0, delay = 0, translateYPosition = 120 }:IAnimateTranslateUp): ReactNode => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [scope, animate] = useAnimate();
    const { scrollYProgress } = useScroll({
        target: scope,
        offset: [`${offset}px end`, 'end']
    });
    const spring = useSpring(scrollYProgress, {
        bounce: 0,
        mass: 0.3,
        stiffness: 50
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if(!isAnimated) {
            spring.set(latest);
        }
    });

    useMotionValueEvent(spring, 'change', (latest) => {
        if(latest <= 1 && !isAnimated)  {
            animate(scope.current, {
                translateY: transform([0, 1], [`${translateYPosition}px`, '0px'])(latest),
            }, { ease: baseAnimationBezier, duration: 0.5, delay: delay });

            setTimeout(() => {
                if(latest === 1) {
                    setIsAnimated(true);
                }
            }, 500)
        }
    });

    return <Box ref={scope} sx={{
        transform: `translateY(${translateYPosition}px) translateZ(0)`,
    }}>
        {children}
    </Box>
}
