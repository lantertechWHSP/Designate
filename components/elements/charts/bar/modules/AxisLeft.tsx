import { useMemo, useState, useEffect, ReactNode } from 'react';

interface IAxisLeft {
    scale:any;
    chartHeight?:number;
    width?:number;
}

export const AxisLeft:any = ({ scale, chartHeight, width }:IAxisLeft) : ReactNode => {
    const [tickCount, setTickCount] = useState(10);

    const ticks:any = useMemo(() => {
        return scale.ticks(tickCount).map((value) => ({
            value,
            offset: scale(value),
        }));
    }, [scale, tickCount]);

    useEffect(() => {
        const clamp = (val:number, min:number, max:number) : number => {
            return val > max ? max : val < min ? min : val;
        }

        let newTickCount = Math.floor(chartHeight / 100) + 1;

        setTickCount(clamp(newTickCount, 1, 10));
    }, [chartHeight]);

    return <g className="y-axis">
        {
            ticks && ticks.map(({ value, offset }) => {
                return <g
                    key={value}
                    className="tick"
                    transform={`translate(0, ${offset})`}
                    shapeRendering={"crispEdges"}
                >
                    <text key={value}
                        fill="currentColor"
                        transform="translate(0, -10)">
                        {value}
                    </text>
                    <line
                        x1={-3}
                        x2={width + 3}
                        stroke="currentColor"
                        strokeWidth={0.5}
                    />
                </g>;
            })
        }
    </g>;
};
