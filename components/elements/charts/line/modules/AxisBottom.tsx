import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom, timeFormat, timeYear } from 'd3';
import { useMediaQuery } from '@chakra-ui/react';
import { breakpoints } from '~/lib/theme/theme';
import { fontRoboto } from '~/app/_fonts';

interface IAxisBottom {
    scale:any;
    transform:string;
}

export const AxisBottom:any = ({ scale, transform }:IAxisBottom) : ReactNode => {
    const elementRef:any = useRef<SVGGElement>(null);
    const [mdMediaQuery] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    // const [lgMediaQuery] = useMediaQuery(`(min-width: ${breakpoints.lg})`);

    useEffect(() => {
        if (elementRef.current) {
            // @ts-ignore
            select(elementRef.current).call(axisBottom(scale).ticks(timeYear.every(mdMediaQuery ? 2 : 3)).tickFormat(timeFormat("%Y")));
        }
    }, [scale, mdMediaQuery]);

    return <g className="x-axis" >
        <g ref={elementRef} transform={transform} style={{ fontFamily: `${fontRoboto.style.fontFamily}` }} />
    </g>;
};
