import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box } from '@chakra-ui/react';
import { scaleLinear, scaleBand, scaleOrdinal, stack } from 'd3';
import { throttle as _throttle, maxBy as _maxBy, sum as _sum, map as _map } from 'lodash';
import { AxisLeft } from '~/components/elements/charts/stackedBar/modules/AxisLeft';
import { AxisBottom } from '~/components/elements/charts/stackedBar/modules/AxisBottom';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';

interface IStackedBarChart {
    stackedBar: {
        subgroups: string[]
        data: IData[],
    };
}

interface IData {
    label:string;
    values:number[];
}

interface IMargin {
    top:number;
    right:number;
    bottom:number;
    left:number;
}

const StackedBarChart:any = ({  stackedBar }:IStackedBarChart) : ReactNode => {
    if(!stackedBar) {
        return;
    }

    const [width, setWidth] = useState<number>(null);
    const [height, setHeight] = useState<number>(null);
    const margin:IMargin = { top: 30, right: 30, bottom: 50, left: 0 };
    const elementRef:any = useRef<ReactNode>();

    const boundsWidth:number = useMemo<number>(() => {
        return width - margin.right - margin.left;
    }, [width]);

    const boundsHeight:number = useMemo<number>(() => {
        return height - margin.top - margin.bottom;
    }, [height]);

    const yScale:any = useMemo<any>(() => {
        if(stackedBar.data) {
            const max:number = _sum(_maxBy(stackedBar.data, (datum:IData) => {
                return _sum(datum.values);
            }).values);

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
    }, [stackedBar, height]);

    const xScale:any = useMemo<any>(() => {
        if(stackedBar.data)  {
            return scaleBand()
                .domain(stackedBar.data.map((datum:IData) => {
                    return datum.label + '​'; // Add ZWSP (number casting issue in d3)
                }))
                .range([0, width])
                .padding(0.5);
        }
    }, [stackedBar, width]);

    const stacked:any = useMemo<any>(() => {
        if(stackedBar.subgroups) {
            const keys = [];

            keys.push(..._map(stackedBar.subgroups, (value:string, index:number) => {
                return `value${index + 1}`;
            }))

            const values = [];

            stackedBar.data.map((datum:IData) => {
                let object = {
                    label: datum.label + '​',  // Add ZWSP (number casting issue in d3)
                }
                datum.values.map((value, index:number) => {
                    object[`value${index + 1}`] = value;
                });

                values.push(object);
            });

            return stack().keys(keys)(values);
        }
    }, [stackedBar]);

    const colors:any = useMemo<any>(() => {
        const colorGenerator:ColorGenerator = new ColorGenerator();

        const values = [];

        stackedBar.subgroups.map(() => {
            values.push(colorGenerator.next());
        });

        const x =  scaleOrdinal().domain(['value1', 'value2', 'value3']).range(values);

        // console.log(values);
        // console.log(x);

        return x;
    })

    useEffect(() => {
        const setDimension:any = () : void => {
            if(elementRef.current) {
                const newWidth:number = elementRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
                setHeight(newWidth * 0.4);
            }
        };

        const handleResize:any = _throttle(() => {
            setDimension();
        }, 100);

        window.addEventListener('resize', handleResize);

        setDimension();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <Box
        ref={elementRef}
        sx={{
            '.tick': {
                fontSize: '14px',
                fontFamily: 'Untitled Sans',
                color: 'steelBlue3'
            },
            '.x-axis .domain': {
                display: 'none'
            },
            '.x-axis .tick line': {
                display: 'none'
            },
            '.y-axis .tick line': {
                color: 'lightGrey2'
            },
            '.bar': {
                fill: 'steelBlue3'
            }
        }}>
        {
            (boundsWidth && boundsHeight) && <svg width={width} height={height} shapeRendering={"crispEdges"}>
                {
                    <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={yScale} width={width} />
                        <g transform="translate(30, 0)">
                            <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                            {stacked.map((data:any, index:number) => {
                                return (
                                    <g key={`group-${index}`} fill={colors(data.key)}>
                                        {data.map((d:any, innerIndex:number) => {
                                            const label = String(d.data.label);
                                            const y0 = yScale(d[0]);
                                            const y1 = yScale(d[1]);

                                            return (
                                                <rect
                                                    key={`rect-${innerIndex}`}
                                                    x={xScale(label)}
                                                    y={y1}
                                                    width={xScale.bandwidth()}
                                                    height={y0 - y1 || 0}
                                                />
                                            );
                                        })}
                                    </g>
                                );
                            })}
                        </g>
                    </g>
                }
            </svg>
        }
    </Box>;
};

export default StackedBarChart;
