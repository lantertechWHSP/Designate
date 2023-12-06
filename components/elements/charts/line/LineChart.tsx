import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { scaleLinear, scaleTime, line, area } from 'd3';
import { Box, Alert, useMediaQuery } from '@chakra-ui/react';
import { max as _max, min as _min, throttle as _throttle, isNil as _isNil , sumBy as _sumBy} from 'lodash';
import { DateTime } from 'luxon';
import { AxisLeft } from "~/components/elements/charts/line/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/line/modules/AxisBottom";
import { breakpoints } from '~/lib/theme/theme';
import { fontRoboto } from '~/app/_fonts';
import { ChartTooltip } from "~/components/elements/charts/line/modules/ChartTooltip";

interface ILineChart {
    data: {
        lines: ILine[];
    };
    textColor?:string;
    borderColor?:string;
    borderColorDark?:string;
    skeletonStartColor?:string;
    skeletonEndColor?:string;
    fillColor?:string;
    tooltipLegendBorderColor?:string;
    tooltipPointFillColor?:string;
    format?:(value:number) => string;
}

interface ILine {
    data:IData[];
    fill?:string;
    label?:string;
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

const LineChart:any = ({ data, textColor = 'steel', borderColor = 'borderColor', borderColorDark = 'charcoal', tooltipLegendBorderColor = 'transparent', tooltipPointFillColor = 'charcoal', fillColor = 'rgba(80, 81, 60, 0.05)', format }:ILineChart) : ReactNode => {
    const desktopHeight:number = 440;
    const mobileHeight:number = 360;
    const [mediaQuery] = useMediaQuery(`(min-width: ${breakpoints.sm})`);
    const [width, setWidth] = useState<number>(null);
    const [height, setHeight] = useState<number>(mediaQuery ? mobileHeight : desktopHeight);
    const margin:IMargin = { top: 30, right: 0, bottom: 30, left: 0 };
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
    }, [data]);

    useEffect(() => {
        if(!_isNil(hasData)) {
            setIsDataLoaded(true);
        }
    }, [hasData]);

    const yScale:any = useMemo<any>(() => {
        if(hasData) {
            const flattendValues:number[] = [];

            data.lines.map((line:ILine) => {
                if(line.data) {
                    line.data.map((datum:IData) => {
                        flattendValues.push(+datum.value);
                    });
                }
            });

            let max:number = _max(flattendValues);

            // Bump for aesthetics (power of 10)
            max *= 1.05;
            // max = Math.pow(10, Math.ceil(Math.log10(max)));

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0])
                .nice();
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
            const newLines:ILineDataSVG[] = [];

            data.lines.map((line:ILine) => {
                if(line.data) {
                    newLines.push({
                        drawnArea: areaBuilder(line.data),
                        drawnLine: lineBuilder(line.data),
                        stroke: line.fill,
                        display: line.display
                    });
                }
            });

            return newLines;
        }
    }, [data, hasData, height, width]);

    useEffect(() => {
        if(mediaQuery) {
            setHeight(desktopHeight);
        }
        else {
            setHeight(mobileHeight);
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

    return <Box ref={elementRef} height={height} fontFamily={`${fontRoboto.style.fontFamily}`}>
        {
            isDataLoaded && <>
                {
                    hasData ? <Box
                        visibility={isChartVisible ? 'visible': 'hidden'}
                        sx={{
                            '.tick': {
                                fontSize: '12px',
                                color: textColor
                            },
                            '.x-axis .domain': {
                                display: 'none'
                            },
                            '.x-axis.compact .tick text': {
                                transform: 'rotate(-60deg) translate(-20px, 2px)'
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
                        <svg width={width} height={height} shapeRendering={"crispEdges"} overflow="visible">
                            <g
                                width={boundsWidth}
                                height={boundsHeight}
                                transform={`translate(${[margin.left, margin.top].join(",")})`}
                            >
                                <AxisLeft scale={yScale} chartHeight={height} width={width} format={format} />
                                <g>
                                    <g>
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
                            <ChartTooltip width={boundsWidth} height={boundsHeight} data={data.lines} xScale={xScale} yScale={yScale} transform={`translate(${[margin.left, margin.top].join(",")})`} tooltipLegendBorderColor={tooltipLegendBorderColor} tooltipPointFillColor={tooltipPointFillColor} />
                        </svg>
                    </Box> : <Alert status="info">No Data</Alert>
                }
            </>
        }
    </Box>;
};

export default LineChart;
