import { ReactNode } from 'react';
import { Skeleton as ChakraSkeleton } from '@chakra-ui/react';

interface ISkeleton {
}

export const Skeleton:any = ({width = '100%', height = '20px', startColor = 'charcoal', endColor = 'charcoalBlur', ...props}:ISkeleton): ReactNode => {
    return <ChakraSkeleton fontFamily='-apple-system, BlinkMacSystemFont' startColor={startColor} endColor={endColor} width={width} height={height} {...props} borderRadius="3px" />;
}
