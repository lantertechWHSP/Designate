import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box } from '@chakra-ui/react';
import { scaleLinear, scaleBand, scaleOrdinal, stack } from 'd3';
import { throttle as _throttle, maxBy as _maxBy, sum as _sum, flatMap as _flatMap } from 'lodash';
import { AxisLeft } from '~/components/elements/charts/stackedBar/modules/AxisLeft';
import { AxisBottom } from '~/components/elements/charts/stackedBar/modules/AxisBottom';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';

interface IStackedBarChart {
    data: {
        groups:string;
        rows:IRow[];
    }
}

interface IRow {
    label:string;
    values:IData[];
}

interface IData {
    key:string;
    value:number;
}

interface IMargin {
    top:number;
    right:number;
    bottom:number;
    left:number;
}

const StackedBarChart:any = ({ data }:IStackedBarChart) : ReactNode => {
    if(!data) {
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
        if(data && data.rows) {
            let max = _maxBy(_flatMap(data.rows, (row:IRow) => {
                return _sum(_flatMap((row.values), (datum:IData) => {
                    return datum.value;
                }));
            }));

            // Bump up the value for aesthetics
            max *= 1.2;

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
    }, [data, height]);

    const xScale:any = useMemo<any>(() => {
        if(data && data.rows)  {
            return scaleBand()
                .domain(data.rows.map((row:IRow) => {
                    return row.label + '​'; // Add ZWSP (number casting issue in d3)
                }))
                .range([0, width])
                .padding(0.5);
        }
    }, [data, width]);

    const stacked:any = useMemo<any>(() => {
        if(data.groups && data.rows) {
            const values = [];

            data.rows.map((row:IRow) => {
                let object = {
                    label: row.label + '​',  // Add ZWSP (number casting issue in d3)
                }

                row.values.map((datum:IData) => {
                    object[datum.key] = datum.value;
                });

                values.push(object);
            });

            return stack().keys(data.groups)(values);
        }
        return [];
    });

    const colors:any = useMemo<any>(() => {
        if(data.groups) {
            const colorGenerator:ColorGenerator = new ColorGenerator();
            const values = [];

            data.groups.map(() => {
                values.push(colorGenerator.next());
            });

            return scaleOrdinal().domain(data.groups).range(values);
        }
    }, [data])

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

                                            const height = Math.max(y0 - y1, 0);

                                            return (
                                                <rect
                                                    key={`rect-${innerIndex}`}
                                                    x={xScale(label)}
                                                    y={y1}
                                                    width={xScale.bandwidth()}
                                                    height={height}
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
