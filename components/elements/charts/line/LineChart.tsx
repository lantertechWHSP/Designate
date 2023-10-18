import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { scaleLinear, scaleTime, line, area } from 'd3';
import { Box } from '@chakra-ui/react';
import { max as _max, min as _min, throttle as _throttle, isNil as _isNil } from 'lodash';
import { DateTime } from 'luxon';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';
import { AxisLeft } from "~/components/elements/charts/line/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/line/modules/AxisBottom";

interface ILineChart {
    data: {
        lines: ILine[];
    }
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
    drawnArea:any;
    drawnLine:any;
    stroke?:string;
    display:boolean;
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
    const margin:IMargin = { top: 30, right: 30, bottom: 30, left: 0 };
    const elementRef:any = useRef<ReactNode>();

    const boundsWidth:number = useMemo<number>(() => {
        return width - margin.right - margin.left;
    }, [width]);

    const boundsHeight:number = useMemo<number>(() => {
        return height - margin.top - margin.bottom;
    }, [height]);

    const yScale:any = useMemo<any>(() => {
        if(data && data.lines) {
            const flattendValues:number[] = [];

            data.lines.map((line:ILine) => {
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
    }, [data, height]);

    const xScale:any = useMemo<any>(() => {
        if(data && data.lines) {
            const flattendDates:number[] = [];

            data.lines.map((line:ILine) => {
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
    }, [data, width]);

    const lineBuilder:any = line<IData>()
        .x((datum:IData) => xScale(datum.date))
        .y((datum:IData) => yScale(datum.value));

    const areaBuilder:any = area<IData>()
        .x((datum:IData) => xScale(datum.date))
        .y1((datum:IData) => yScale(datum.value))
        .y0(yScale(0));

    const linesSVG:any = useMemo(() => {
        const colorGenerator:ColorGenerator = new ColorGenerator();
        const newLines:ILineDataSVG[] = [];

        data.lines.map((line:ILine) => {
            if(line.data) {
                newLines.push({
                    drawnArea: areaBuilder(line.data),
                    drawnLine: lineBuilder(line.data),
                    stroke: line.fill ? line.fill : colorGenerator.next(),
                    display: line.display
                });
            }
        });

        return newLines;
    }, [data, height, width]);

    useEffect(() => {
        const setDimension:any = () : void => {
            if(elementRef.current) {
                const newWidth:number = elementRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
                setHeight(newWidth * 0.45);
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
                fontFamily: 'Gramatika',
                color: 'darkBrown'
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
        }}>
        {
            (boundsWidth && boundsHeight) && <svg width={width} height={height} shapeRendering={"crispEdges"}>
                {
                    (data && data.lines) && <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={yScale} chartHeight={height} width={width} />
                        <g transform="translate(30, 0)">
                            <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                            {
                                (Array.isArray(linesSVG) && linesSVG.length > 0) && <>
                                    <g>
                                        {
                                            linesSVG.map((line:ILineDataSVG, index:number) => {
                                                {
                                                    return <Fragment key={index}>
                                                        {
                                                            ((_isNil(line.display) || line.display) && index === 0) &&
                                                            <path
                                                                d={line.drawnArea}
                                                                fill={'rgba(80, 81, 60, 0.2)'}
                                                                opacity={1}
                                                                zIndex="0"
                                                                strokeWidth={0}
                                                            />
                                                        }
                                                    </Fragment>;
                                                }
                                            })
                                        }
                                    </g>
                                    {
                                        linesSVG.map((line:ILineDataSVG, index:number) => {
                                            {
                                                return <Fragment key={index}>
                                                    {
                                                        (_isNil(line.display) || line.display) &&
                                                            <path
                                                                d={line.drawnLine}
                                                                zIndex="2"
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
