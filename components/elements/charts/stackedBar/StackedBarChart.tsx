import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box, Alert, useMediaQuery } from '@chakra-ui/react';
import { scaleLinear, scaleBand, scaleOrdinal, stack } from 'd3';
import { throttle as _throttle, maxBy as _maxBy, sum as _sum, sumBy as _sumBy, flatMap as _flatMap, map as _map } from 'lodash';
import { AxisLeft } from '~/components/elements/charts/stackedBar/modules/AxisLeft';
import { AxisBottom } from '~/components/elements/charts/stackedBar/modules/AxisBottom';
import {breakpoints} from "~/lib/theme/theme";

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

const StackedBarChart:any = ({ data, textColor = 'steelBlue', borderColor = 'borderColor' }:IStackedBarChart) : ReactNode => {
    const [mediaQuery] = useMediaQuery(`(min-width: ${breakpoints.sm})`);
    const [width, setWidth] = useState<number>(null);
    const [height, setHeight] = useState<number>(mediaQuery ? 390 : 340);
    const margin:IMargin = { top: 30, right: 30, bottom: 50, left: 0 };
    const elementRef:any = useRef<ReactNode>();
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [hasData, setHasData] = useState<boolean>(null);
    const [isChartVisible, setIsChartVisible] = useState<boolean>(false);

    const boundsWidth:number = useMemo<number>(() => {
        return width - margin.right - margin.left;
    }, [width]);

    const boundsHeight:number = useMemo<number>(() => {
        return height - margin.top - margin.bottom;
    }, [height]);

    useState(() => {
        if(data && Array.isArray(data.rows) && data.rows.length > 0) {
            const sum:number = _sumBy(data.rows, (row:IDataRow) => {
                return Array.isArray(row.values) ? row.values.length : 0;
            });

            setHasData(sum > 0);
        }
        else {
            setHasData(false);
        }

        setTimeout(() => {
            setIsDataLoaded(true);
        }, 1);
    }, [data]);

    const yScale:any = useMemo<any>(() => {
        if(hasData) {
            let max:number = _maxBy(_flatMap(data.rows, (row:IDataRow) => {
                return _sum(_flatMap((row.values), (datum:IData) => {
                    return datum.value;
                }));
            }));

            // Bump up the value for aesthetics
            max *= 1.05;

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
        else {
            return null;
        }
    }, [data, hasData, height]);

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
            return null;
        }
    }, [data, hasData, width]);

    useEffect(() => {
        if(xScale !== null && yScale !== null) {
            setTimeout(() => {
                setIsChartVisible(true);
            }, 1);
        }
    }, [xScale, yScale]);

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
        if(mediaQuery) {
            setHeight(390);
        }
        else {
            setHeight(340);
        }
    }, [mediaQuery]);

    useEffect(() => {
        const setDimension:any = () : void => {
            if(elementRef.current) {
                const newWidth:number = elementRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
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

    return <Box ref={elementRef} height={height}>
        {
            isDataLoaded && <>
            {
                hasData ? <Box visibility={isChartVisible ? 'visible': 'hidden'}
                sx={{
                    '.tick': {
                        fontSize: '12px',
                        fontFamily: 'Roboto',
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
                    <svg width={width} height={height} shapeRendering={"crispEdges"}>
                            {
                                <g
                                    width={boundsWidth}
                                    height={boundsHeight}
                                    transform={`translate(${[margin.left, margin.top].join(",")})`}
                                    overflow={"visible"}
                                >
                                    <AxisLeft scale={yScale} chartHeight={height} width={width} />
                                    <g transform="translate(10px, 0)">
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
              </Box> : <Alert status="info">No Data</Alert>
            }
            </>
        }
    </Box>;
};

export default StackedBarChart;
