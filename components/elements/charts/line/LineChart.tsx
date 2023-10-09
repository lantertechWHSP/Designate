import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { scaleLinear, scaleTime, line } from 'd3';
import { Box } from '@chakra-ui/react';
import { max as _max, min as _min, map as _map, throttle as _throttle, flatten as _flatten } from 'lodash';
import { DateTime } from 'luxon';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';
import { AxisLeft } from "~/components/elements/charts/line/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/line/modules/AxisBottom";

interface ILineChart {
    data: {
        lines: ILine[]
    }
}

interface ILine {
    data:IData[];
}

interface IData {
    date:DateTime;
    value:number;
}

interface ILineDataSVG {
    d:any;
    stroke:string;
}

interface IMargin {
    top:number;
    right:number;
    bottom:number;
    left:number;
}

const LineChart:any = ({ data }:ILineChart) : ReactNode => {
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
        if(data) {
            const flattendValues:number[] = [];

            data.lines.map((line:ILine) => {
                line.data.map((datum:IData) => {
                    flattendValues.push(datum.value);
                });
            });

            let max = _max(flattendValues);

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
    }, [data, height]);

    const xScale:any = useMemo<any>(() => {
        if(data) {
            const flattendDates:DateTime[] = [];

            data.lines.map((line:ILine) => {
                line.data.map((datum:IData) => {
                    flattendDates.push(datum.date.valueOf());
                });
            });

            let min = _min(flattendDates);
            let max = _max(flattendDates);

            return scaleTime()
                .domain([min, max])
                .range([0, width]);
        }
    }, [data, width]);

    const lineBuilder:any = line<IData>()
        .x((datum:IData) => xScale(datum.date))
        .y((datum:IData) => yScale(datum.value));

    const lines:any = useMemo(() => {
        const colorGenerator:ColorGenerator = new ColorGenerator();
        const newLines:ILineDataSVG[] = [];

        data.lines.map((line:ILine) => {
            debugger;
            newLines.push({
                d: lineBuilder(line.data),
                stroke: colorGenerator.next()
            });
        });

        return newLines;
    }, [data]);

    useEffect(() => {
        const setDimension:any = () : void => {
            if(elementRef.current) {
                const newWidth:number = elementRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
                setHeight(newWidth * 0.66);
            }
        };

        const handleResize:any = _throttle(() => {
            setDimension();
        }, 100);

        window.addEventListener("resize", handleResize);

        setDimension();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <Box
        ref={elementRef}
        sx={{
            '.tick': {
                fontSize: '14px',
                fontFamily: 'Untitled Sans',
                color: 'steelBlue3',
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
                    data && <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={yScale} width={width} />
                        <g transform="translate(30, 0)">
                            <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                            {
                                (Array.isArray(lines) && lines.length > 0) && <>
                                    {
                                        lines.map((line:ILineDataSVG, index:number) => {
                                            return <Fragment key={index}>
                                                <path
                                                    d={line.d}
                                                    opacity={1}
                                                    stroke={line.stroke}
                                                    fill="none"
                                                    strokeWidth={2}
                                                />
                                            </Fragment>;
                                        })
                                    }
                                </>
                            }
                        </g>
                    </g>
                }
            </svg>
        }
    </Box>;
};

export default LineChart;
