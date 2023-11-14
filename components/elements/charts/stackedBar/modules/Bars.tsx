import { ReactNode } from 'react';
import { Popover, PopoverTrigger, Portal, PopoverContent, Box } from '@chakra-ui/react';

interface IBars {
    xScale?:any;
    yScale?:any;
    stacked?:any;
    boundsHeight:number;
    colors?:any;
}

export const Bars:any = ({ xScale, yScale, stacked, colors, borderColor }:IBars) : ReactNode => {
    const borderRadius:number = 3;

    return <>
        {
            stacked.map((data:any, index:number) => {
                return <g className="stacked-bar" key={`group-${index}`} fill={colors(data.key)}>
                    {
                        data.map((d:any, innerIndex:number) => {
                            const label:string = String(d.data.label);
                            const value:string = String(d.data[data.key]);
                            const y0:number = yScale(d[0]);
                            const y1:number = yScale(d[1]);

                            // Loop down per xScale to determine the topmost bar to put a border radius
                            let borderRadiusIndex:number = stacked.length - 1;
                            for(let k:number = (stacked.length - 1); k >= 0; k--) {
                                const innerY0:number = yScale(stacked[k][innerIndex][0]);
                                const innerY1:number = yScale(stacked[k][innerIndex][1]);

                                if(innerY0 - innerY1 > 0) {
                                    borderRadiusIndex = k;
                                    break;
                                }
                            }
                            const hasBorderRadius:boolean = borderRadiusIndex === index;

                            // Set the height accordingly
                            const height:number = Math.max((y0 - y1) + (hasBorderRadius ? borderRadius : 0), 0);

                            return <Popover placement="top" trigger="hover" isLazy>
                                <PopoverTrigger>
                                    <rect clipPath={hasBorderRadius ? `inset(0 0 ${borderRadius}px 0)` : ''}
                                          rx={hasBorderRadius ? borderRadius : 0}
                                          ry={hasBorderRadius ? borderRadius : 0}
                                          key={`rect-${innerIndex}`}
                                          x={xScale(label)}
                                          y={y1}
                                          width={xScale.bandwidth()}
                                          height={height}/>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        <Box background="white" fontSize="12px" fontFamily="Roboto" borderColor={borderColor} px="10px" textAlign="center" minW="40px" py="3px">
                                            {value}
                                        </Box>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        })
                    }
                </g>;
            }
            )}
    </>;
};
