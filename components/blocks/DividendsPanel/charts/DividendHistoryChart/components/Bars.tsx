import { ReactNode } from 'react';

export const Bars = ({ data, height, xScale, yScale }:any) : ReactNode =>  {
    return <>
        {
            (Array.isArray(data) && data.length > 0) &&  <g className="bars">
                {data.map(({ value, label }) => (
                    <rect
                        className="bar"
                        key={`bar-${label}`}
                        x={xScale(label)}
                        y={yScale(value)}
                        width={xScale.bandwidth()}
                        height={height - yScale(value)}
                    />
                ))}
            </g>
        }
    </>;
};
