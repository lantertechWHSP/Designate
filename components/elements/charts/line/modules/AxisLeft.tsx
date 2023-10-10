import { useMemo, ReactNode } from 'react';

interface IAxisLeft {
    scale:any;
    width:number;
}

export const AxisLeft:any = ({ scale, width }:IAxisLeft) : ReactNode => {
    const ticks:any = useMemo(() => {
        return scale.ticks().map((value) => ({
            value,
            offset: scale(value),
        }));
    }, [scale]);

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
