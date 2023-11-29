import { ReactNode, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { baseAnimationBezier } from '~/lib/theme/theme';
import { useAnimate, useMotionValueEvent, useScroll } from 'framer-motion';

interface IAnimateOverflowText {
    children?:any;
    delay?:number;
}

export const AnimateOpacity:any = ({ children, delay =  0, ...props}:IAnimateOverflowText) : ReactNode => {
    const [scope, animate] = useAnimate();
    const { scrollYProgress } = useScroll({
        target: scope,
        offset: [`start end`, 'end']
    });

    const [isAnimated, setIsAnimated] = useState(false);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if(!isAnimated && latest >= 0) {
            animate(scope.current, {
                opacity: 1.01
            }, {
                ease: baseAnimationBezier,
                duration: 0.7,
                delay: delay
            });

            setIsAnimated(true);
        }
    });

    return <Box ref={scope} sx={{
        opacity: 0
    }} {...props}>
        {children}
    </Box>;
};
