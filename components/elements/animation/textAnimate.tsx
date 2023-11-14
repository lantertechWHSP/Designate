import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll } from 'framer-motion';
const MotionBox:any = motion(Box);

interface ITextAnimate {
    children?:any;
}

export const TextAnimate:any = ({ delay = 0, children }:ITextAnimate): ReactNode => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"]
    });

    return <MotionBox transition={{ ease: "easeOut", duration: 0.3, delay: delay }}
               initial={{ transform: 'translateY(100%)' }}
               whileInView={{ transform: 'translateY(0%)' }}
               viewport={{ once: true }}>
        {children}
    </MotionBox>
}
