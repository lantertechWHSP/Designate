import { ReactNode } from 'react';

interface IBars {
    values: IData[];
    height:number;
    xScale:any;
    yScale:any;
}

interface IData {
    value:number;
    label:string;
}

export const Bars:any = ({ values, height, xScale, yScale }:IBars) : ReactNode =>  {
    return <>
        {
            (Array.isArray(values) && values.length > 0) &&  <g className="bars">
                {values.map(({ value, label }) => (
                    <rect
                        rx="3"
                        className="bar"
                        key={`bar-${label}`}
                        x={xScale(label)}
                        y={yScale(value)}
                        width={xScale.bandwidth()}
                        height={Math.max(height - yScale(value), 0)}
                    />
                ))}
            </g>
        }
    </>;
};
