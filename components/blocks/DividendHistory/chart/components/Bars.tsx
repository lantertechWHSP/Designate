import { ReactNode } from 'react';

interface IBarsProps {
    data: {
        value:number;
        label:string;
    };
    height:number;
    xScale:any;
    yScale:any;
}

export const Bars:any = ({ data, height, xScale, yScale }:IBarsProps) : ReactNode =>  {
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
