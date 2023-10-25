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
    const borderRadius:number = 3;
    return <>
        {
            (Array.isArray(values) && values.length > 0) &&  <g className="bars">
                {values.map(({ value, label }) => (
                    <g clipPath={`inset(0 0 ${borderRadius}px 0)`} key={`bar-${label}`}>
                        <rect
                            rx={borderRadius}
                            ry={borderRadius}
                            className="bar"
                            x={xScale(label)}
                            y={yScale(value)}
                            width={xScale.bandwidth()}
                            height={(Math.max(height - yScale(value)) + borderRadius)}
                        />
                    </g>
                ))}
            </g>
        }
    </>;
};
