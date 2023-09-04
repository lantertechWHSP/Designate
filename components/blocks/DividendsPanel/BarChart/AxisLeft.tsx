import { useMemo } from 'react';

export const AxisLeft = ({ scale, width }:any) => {
    const ticks = useMemo(() => {
        return scale.ticks().map((value) => ({
            value,
            offset: scale(value),
        }))
    }, [scale])

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
                </g>
            })
        }
    </g>;
}
