import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom, timeFormat, timeYear } from 'd3';

export const AxisBottom = ({ scale, transform }:any) : ReactNode => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale).ticks(timeYear.every(1)).tickFormat(timeFormat("%Y")));
        }
    }, [scale]);

    return <g className="x-axis">
        <g ref={ref} transform={transform} />
    </g>;
};
