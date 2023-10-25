import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { scaleLinear, scaleTime, line, area } from 'd3';
import { Box, Alert } from '@chakra-ui/react';
import { max as _max, min as _min, throttle as _throttle, isNil as _isNil , sumBy as _sumBy} from 'lodash';
import { DateTime } from 'luxon';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';
import { AxisLeft } from "~/components/elements/charts/line/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/line/modules/AxisBottom";

interface ILineChart {
    data: {
        lines: ILine[];
    };
    textColor?:string;
    borderColor?:string;
    fillColor?:string;
}

interface ILine {
    data:IData[];
    fill?:string;
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

const LineChart:any = ({ data, textColor = 'darkBrown', borderColor = 'lightGrey2', fillColor = 'rgba(80, 81, 60, 0.05)' }:ILineChart) : ReactNode => {
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

    const hasData:any = useMemo(() => {
        if(data && Array.isArray(data.lines) && data.lines.length > 0) {
            const sum:number = _sumBy(data.lines, (line) => {
                return Array.isArray(line.data) ? line.data.length : 0;
            });

            return sum > 0;
        }
        return false;
    }, [data]);

    const yScale:any = useMemo<any>(() => {
        if(hasData) {
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
        else {
            return scaleLinear()
                .domain([0, 10])
                .range([boundsHeight, 0]);
        }
    }, [hasData, height]);

    const xScale:any = useMemo<any>(() => {
        if(hasData) {
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
        else {
            return scaleTime()
                .domain([DateTime.now().valueOf(), DateTime.now().valueOf()])
                .range([0, width]);
        }
    }, [hasData, width]);

    const lineBuilder:any = line<IData>()
        .x((datum:IData) => xScale(datum.date))
        .y((datum:IData) => yScale(datum.value));

    const areaBuilder:any = area<IData>()
        .x((datum:IData) => xScale(datum.date))
        .y1((datum:IData) => yScale(datum.value))
        .y0(yScale(0));

    const linesSVG:any = useMemo(() => {
        if(hasData) {
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
        }
    }, [hasData, height, width]);

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

    return <Box ref={elementRef}>
        {
            hasData ? <Box sx={{
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
                           },
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
                            <g>
                                <g transform="translate(30, 0)">
                                    <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                                </g>
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
                                                                    fill={fillColor}
                                                                    opacity={1}
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
            </Box> : <Alert status="info">No Data</Alert>
        }
    </Box>;
};

export default LineChart;
