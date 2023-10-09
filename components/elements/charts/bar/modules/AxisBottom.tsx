import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom } from 'd3';
import { Axis, AxisDomain } from 'd3-axis';

interface IAxisBottomProps {
    scale:any;
    transform:string;
    customAxisBottom?:Axis<AxisDomain>;

}

export const AxisBottom:any = ({ scale, transform, customAxisBottom }:IAxisBottomProps) : ReactNode => {
    const elementRef:any = useRef<SVGGElement>(null);

    useEffect(() => {
        if (elementRef.current) {
            if(customAxisBottom) {
                select(elementRef.current).call(customAxisBottom);
            }
            else {
                select(elementRef.current).call(axisBottom(scale));
            }
        }
    }, [scale]);

    return <g className="x-axis">
        <g ref={elementRef} transform={transform} />
    </g>;
};
