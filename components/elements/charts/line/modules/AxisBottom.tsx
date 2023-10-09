import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom, timeFormat, timeYear } from 'd3';

interface IAxisBottomProps {
    scale:any;
    transform:string;
}

export const AxisBottom:any = ({ scale, transform }:IAxisBottomProps) : ReactNode => {
    const elementRef:any = useRef<SVGGElement>(null);

    useEffect(() => {
        if (elementRef.current) {
            // @ts-ignore
            select(elementRef.current).call(axisBottom(scale).ticks(timeYear.every(1)).tickFormat(timeFormat("%Y")));
        }
    }, [scale]);

    return <g className="x-axis">
        <g ref={elementRef} transform={transform} />
    </g>;
};
