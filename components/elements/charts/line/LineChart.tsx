import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { scaleLinear, scaleTime, line, area } from 'd3';
import { Box, Alert, useMediaQuery } from '@chakra-ui/react';
import { max as _max, min as _min, throttle as _throttle, isNil as _isNil , sumBy as _sumBy} from 'lodash';
import { DateTime } from 'luxon';
import { ColorGenerator } from '~/lib/colorGenerator/colorGenerator';
import { AxisLeft } from "~/components/elements/charts/line/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/line/modules/AxisBottom";
import { breakpoints } from '~/lib/theme/theme';

interface ILineChart {
    data: {
        lines: ILine[];
    };
    textColor?:string;
    borderColor?:string;
    borderColorDark?:string;
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

const LineChart:any = ({ data, textColor = 'steel', borderColor = 'borderColor', borderColorDark = 'charcoal', fillColor = 'rgba(80, 81, 60, 0.05)' }:ILineChart) : ReactNode => {
    const [mediaQuery] = useMediaQuery(`(min-width: ${breakpoints.sm})`);
    const [width, setWidth] = useState<number>(null);
    const [height, setHeight] = useState<number>(mediaQuery ? 300 : 340);
    const margin:IMargin = { top: 30, right: 30, bottom: 30, left: 0 };
    const elementRef:any = useRef<ReactNode>();
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [hasData, setHasData] = useState<boolean>(false);
    const [isChartVisible, setIsChartVisible] = useState<boolean>(false);

    const boundsWidth:number = useMemo<number>(() => {
        return width - margin.right - margin.left;
    }, [width]);

    const boundsHeight:number = useMemo<number>(() => {
        return height - margin.top - margin.bottom;
    }, [height]);

    useEffect(() => {
        if(data && Array.isArray(data.lines) && data.lines.length > 0) {
            const sum:number = _sumBy(data.lines, (line) => {
                return Array.isArray(line.data) ? line.data.length : 0;
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
            return null;
        }
    }, [data, hasData, height]);

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

    const lineBuilder:any = useMemo(() => {
        if(xScale && yScale) {
            return line<IData>()
                .x((datum:IData) => xScale(datum.date))
                .y((datum:IData) => yScale(datum.value));
        }
        return null;
    }, [xScale, yScale]);

    const areaBuilder:any = useMemo(() => {
        if(xScale && yScale) {
            return area<IData>()
                .x((datum:IData) => xScale(datum.date))
                .y1((datum:IData) => yScale(datum.value))
                .y0(yScale(0));
        }
        return null;
    }, [xScale, yScale]);


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
    }, [data, hasData, height, width]);

    useEffect(() => {
        if(mediaQuery) {
            setHeight(300);
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
                    hasData ? <Box
                        visibility={isChartVisible ? 'visible': 'hidden'}
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
                            },
                            '.y-axis .tick:first-of-type line': {
                                color: borderColorDark
                            },

                        }}>
                        <svg width={width} height={height} shapeRendering={"crispEdges"}>
                            <g
                                width={boundsWidth}
                                height={boundsHeight}
                                transform={`translate(${[margin.left, margin.top].join(",")})`}
                                overflow={"visible"}
                            >
                                <AxisLeft scale={yScale} chartHeight={height} width={width} />
                                <g>
                                    <g transform="translate(15, 0)">
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
                        </svg>
                    </Box> : <Alert status="info">No Data</Alert>
                }
            </>
        }
    </Box>;
};

export default LineChart;
