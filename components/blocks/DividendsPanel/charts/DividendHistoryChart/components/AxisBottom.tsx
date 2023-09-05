import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom } from 'd3';

export const AxisBottom = ({ scale, transform }:any) : ReactNode => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g className="x-axis">
        <g ref={ref} transform={transform} />
    </g>;
};
