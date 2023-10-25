import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box, Alert } from '@chakra-ui/react';
import { scaleLinear, scaleBand, scaleOrdinal, stack } from 'd3';
import { throttle as _throttle, maxBy as _maxBy, sum as _sum, sumBy as _sumBy, flatMap as _flatMap, map as _map } from 'lodash';
import { AxisLeft } from '~/components/elements/charts/stackedBar/modules/AxisLeft';
import { AxisBottom } from '~/components/elements/charts/stackedBar/modules/AxisBottom';

interface IStackedBarChart {
    data: {
        groups:IDataGroup[];
        rows:IDataRow[];
    };
    textColor?:string;
    borderColor?:string;
    fillColor?:string;
}

interface IDataGroup {
    label:string;
    fill:string;
}

interface IDataRow {
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

const StackedBarChart:any = ({ data, textColor = 'darkBrown', borderColor = 'borderColor' }:IStackedBarChart) : ReactNode => {
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

    const hasData:any = useMemo(() => {
        if(data && Array.isArray(data.rows) && data.rows.length > 0) {
            const sum:number = _sumBy(data.rows, (row:IDataRow) => {
                return Array.isArray(row.values) ? row.values.length : 0;
            })

            return sum > 0;
        }
        return false;
    }, [data]);

    const yScale:any = useMemo<any>(() => {
        if(hasData) {
            let max:number = _maxBy(_flatMap(data.rows, (row:IDataRow) => {
                return _sum(_flatMap((row.values), (datum:IData) => {
                    return datum.value;
                }));
            }));

            // Bump up the value for aesthetics
            max *= 1.3;

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
        else {
            return scaleLinear()
                .domain([0, 1])
                .range([boundsHeight, 0]);
        }
    }, [hasData, height]);

    const xScale:any = useMemo<any>(() => {
        if(hasData)  {
            return scaleBand()
                .domain(data.rows.map((row:IDataRow) => {
                    return row.label + '​'; // Add ZWSP (number casting issue in d3)
                }))
                .range([0, width])
                .padding(0.5);
        }
        else {
            return scaleBand()
                .domain([0, 1])
                .range([0, width])
                .padding(0.5);
        }
    }, [data, hasData, width]);

    const stacked:any = useMemo<any>(() => {
        if(data.groups && data.rows) {
            const values:any[] = [];

            data.rows.map((row:IDataRow) => {
                const object:any = {
                    label: row.label + '​',  // Add ZWSP (number casting issue in d3)
                };

                row.values.map((datum:IData) => {
                    object[datum.key] = datum.value;
                });

                values.push(object);
            });

            return stack().keys(_map(data.groups, (group:IDataGroup) => {
                return group.label;
            }))(values);
        }
        return [];
    }, [data]);

    const colors:any = useMemo<any>(() => {
        if(data.groups) {
            const values:any = [];

            data.groups.map((group:IDataGroup) => {
                values.push(group.fill);
            });

            return scaleOrdinal().domain(_map(data.groups, (group:IDataGroup) => {
                return group.label;
            })).range(values);
        }
    }, [data]);

    useEffect(() => {
        const setDimension:any = () : void => {
            if(elementRef.current) {
                const newWidth:number = elementRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
                setHeight(390);
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

    return <Box ref={elementRef}>
        {
            hasData ? <Box
                sx={{
                    '.tick': {
                        fontSize: '14px',
                        fontFamily: 'Gramatika',
                        color: textColor
                    },
                    '.x-axis .domain': {
                        display: 'none'
                    },
                    '.x-axis .tick line': {
                        display: 'none'
                    },
                    '.y-axis .tick line': {
                        color: borderColor
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
                                <AxisLeft scale={yScale} chartHeight={height} width={width} />
                                <g transform="translate(30, 0)">
                                    <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                                    {stacked.map((data:any, index:number) => {
                                        return (
                                            <g key={`group-${index}`} fill={colors(data.key)}>
                                                {data.map((d:any, innerIndex:number) => {
                                                    const label:string = String(d.data.label);
                                                    const y0:number = yScale(d[0]);
                                                    const y1:number = yScale(d[1]);

                                                    const height:number = Math.max(y0 - y1, 0);

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
            </Box> : <Alert status="info">No Data</Alert>
        }
    </Box>
};

export default StackedBarChart;
