import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom, timeFormat, timeYear } from 'd3';

interface IAxisBottomProps {
    scale:any;
    transform:string;
}

export const AxisBottom:Function = ({ scale, transform }:IAxisBottomProps) : ReactNode => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            // @ts-ignore
            select(ref.current).call(axisBottom(scale).ticks(timeYear.every(1)).tickFormat(timeFormat("%Y")));
        }
    }, [scale]);

    return <g className="x-axis">
        <g ref={ref} transform={transform} />
    </g>;
};
