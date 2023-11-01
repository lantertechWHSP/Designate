import { ReactNode } from 'react';
import { Popover, PopoverTrigger, Portal, PopoverContent, Box } from '@chakra-ui/react';

interface IBars {
    values: IData[];
    height:number;
    xScale:any;
    yScale:any;
    borderColor?:any;
}

interface IData {
    value:number;
    label:string;
}

export const Bars:any = ({ values, height, xScale, yScale, borderColor }:IBars) : ReactNode =>  {
    const borderRadius:number = 3;

    return <>
        {
            (Array.isArray(values) && values.length > 0) &&  <g className="bars">
                {
                    values.map(({ value, label }) => {
                        return <g clipPath={`inset(0 0 ${borderRadius}px 0)`} className="bar" key={`bar-${label}`}>
                            <Popover placement="top" trigger="hover" isLazy>
                                <PopoverTrigger>
                                    <rect
                                        rx={borderRadius}
                                        ry={borderRadius}
                                        className="bar"
                                        x={xScale(label)}
                                        y={yScale(value)}
                                        width={xScale.bandwidth()}
                                        height={(Math.max(height - yScale(value)  + borderRadius, 0))}
                                    />
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        <Box background="white" fontSize="12px" fontFamily="Roboto" borderColor={borderColor} px="10px" textAlign="center" minW="40px" py="3px">
                                            {value}
                                        </Box>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        </g>;
                    })
                }
            </g>
        }
    </>;
};
