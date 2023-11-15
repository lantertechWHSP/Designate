import { ReactNode, Fragment } from 'react';
import { Popover, PopoverTrigger, Portal, PopoverContent, Box } from '@chakra-ui/react';
import { Tooltip } from '~/components/elements/tooltip';

interface IBars {
    values: IData[];
    height:number;
    xScale:any;
    yScale:any;
    suffix?:any;
}

interface IData {
    value:number;
    label:string;
}

export const Bars:any = ({ values, height, xScale, yScale, suffix }:IBars) : ReactNode =>  {
    const borderRadius:number = 3;

    return <>
        {
            (Array.isArray(values) && values.length > 0) &&  <g className="bars">
                {
                    values.map(({ value, label }, index:number) => {
                        return <Fragment key={index}>
                            <Popover placement="top" trigger="click" isLazy>
                                <PopoverTrigger>
                                    <g clipPath={`inset(0 0 ${borderRadius}px 0)`} className="bar">
                                        <rect
                                            rx={borderRadius}
                                            ry={borderRadius}
                                            className="bar"
                                            x={xScale(label)}
                                            y={yScale(value)}
                                            width={xScale.bandwidth()}
                                            height={(Math.max(height - yScale(value)  + borderRadius, 0))}
                                        />
                                    </g>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        <Tooltip>
                                            <Box>
                                                {label}
                                            </Box>
                                            <Box>
                                                <Text mb={0} as="label" mr={2}>
                                                    Value:
                                                </Text>
                                                <Text mb={0} as="span">{value} {suffix}</Text>
                                            </Box>
                                        </Tooltip>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        </Fragment>;
                    })
                }
            </g>
        }
    </>;
};
