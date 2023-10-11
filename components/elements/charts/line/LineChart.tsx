import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { scaleLinear, scaleTime, line } from 'd3';
import { Box } from '@chakra-ui/react';
import { max as _max, min as _min, throttle as _throttle, isNil as _isNil } from 'lodash';
import { DateTime } from 'luxon';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';
import { AxisLeft } from "~/components/elements/charts/line/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/line/modules/AxisBottom";

interface ILineChart {
    lines: ILine[];
}

interface ILine {
    data:IData[];
    display:boolean;
}

interface IData {
    date:DateTime;
    value:number;
}

interface ILineDataSVG {
    d:any;
    stroke:string;
    display:boolean;
}

interface IMargin {
    top:number;
    right:number;
    bottom:number;
    left:number;
}

const LineChart:any = ({ lines }:ILineChart) : ReactNode => {
    if(!lines) {
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
        if(lines) {
            const flattendValues:number[] = [];

            lines.map((line:ILine) => {
                if(line.data) {
                    line.data.map((datum:IData) => {
                        flattendValues.push(datum.value);
                    });
                }
            });

            const max:number = _max(flattendValues);

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
    }, [lines, height]);

    const xScale:any = useMemo<any>(() => {
        if(lines) {
            const flattendDates:number[] = [];

            lines.map((line:ILine) => {
                if(line.data) {
                    line.data.map((datum:IData) => {
                        flattendDates.push(datum.date.valueOf());
                    });
                }
            });

            const min:number = _min(flattendDates);
            const max:number = _max(flattendDates);

            return scaleTime()
                .domain([min, max])
                .range([0, width]);
        }
    }, [lines, width]);

    const lineBuilder:any = line<IData>()
        .x((datum:IData) => xScale(datum.date))
        .y((datum:IData) => yScale(datum.value));

    const linesSVG:any = useMemo(() => {
        const colorGenerator:ColorGenerator = new ColorGenerator();
        const newLines:ILineDataSVG[] = [];

        lines.map((line:ILine) => {
            if(line.data) {
                newLines.push({
                    d: lineBuilder(line.data),
                    stroke: colorGenerator.next(),
                    display: line.display
                });
            }
        });

        return newLines;
    }, [lines]);

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
                    lines && <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={yScale} width={width} />
                        <g transform="translate(30, 0)">
                            <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                            {
                                (Array.isArray(linesSVG) && linesSVG.length > 0) && <>
                                    {
                                        linesSVG.map((line:ILineDataSVG, index:number) => {
                                            {
                                                return <Fragment key={index}>
                                                    {
                                                        (_isNil(line.display) || line.display) && <path
                                                            d={line.d}
                                                            opacity={1}
                                                            stroke={line.stroke}
                                                            fill="none"
                                                            strokeWidth={2}
                                                        />
                                                    }
                                                </Fragment>;
                                            }
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
