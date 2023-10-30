import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom } from 'd3';
import { useMediaQuery } from '@chakra-ui/react'
import { breakpoints } from '~/lib/theme/theme';

interface IAxisBottom {
    scale:any;
    transform:string;
}

export const AxisBottom:any = ({ scale, transform }:IAxisBottom) : ReactNode => {
    const elementRef:any = useRef<SVGGElement>(null);

    const [mediaQuery] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    useEffect(() => {
        console.log(mediaQuery);
        if (elementRef.current) {
            select(elementRef.current).call(axisBottom(scale).tickValues(scale.domain().filter((datum:IData, index:number) => {
                return mediaQuery ? true : index % 3 === 0;
            })));
        }
    }, [scale, mediaQuery]);

    return <g className="x-axis">
        <g ref={elementRef} transform={transform} />
    </g>;
};
