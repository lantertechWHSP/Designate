import { useMemo, useState, useEffect, ReactNode } from 'react';
import { isFunction as _isFunction } from 'lodash';

interface IAxisLeft {
    scale:any;
    chartHeight?:number;
    width?:number;
    format?:(value:number) => string;
}

export const AxisLeft:any = ({ scale, chartHeight, width, format }:IAxisLeft) : ReactNode => {
    const [tickCount, setTickCount] = useState<number>(10);

    const ticks:any = useMemo(() => {
        return scale.ticks(tickCount).map((value) => ({
            value,
            offset: scale(value),
        }));
    }, [scale, tickCount]);

    useEffect(() => {
        const clamp:any = (val:number, min:number, max:number) : number => {
            return Math.min(Math.max(val, min), max);
        };

        const newTickCount:number = Math.floor(chartHeight / 100) + 1;

        setTickCount(clamp(newTickCount, 3, 10));
    }, [chartHeight]);

    return <g className="y-axis">
        {
            ticks && ticks.map(({ value, offset }, index:number) => {
                return <g
                    key={value}
                    className="tick"
                    transform={`translate(0, ${offset})`}
                    shapeRendering={"crispEdges"}
                >
                    <text key={value}
                        fill="currentColor"
                        display={index > 0 ? 'block' : 'none'}
                        transform="translate(0, 15)">
                        {_isFunction(format) ? format(value) : value}
                    </text>
                    <line
                        x1={0}
                        x2={width}
                        stroke="currentColor"
                        strokeWidth={0.5}
                    />
                </g>;
            })
        }
    </g>;
};
