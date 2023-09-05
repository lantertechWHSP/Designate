import { useMemo, ReactNode } from 'react';

interface IAxisLeftProps {
    scale:any;
    width:number;
}

export const AxisLeft:Function = ({ scale, width }:IAxisLeftProps) : ReactNode => {
    const ticks = useMemo(() => {
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
