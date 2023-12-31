import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box, Alert, useMediaQuery } from '@chakra-ui/react';
import { scaleLinear, scaleBand } from 'd3';
import { AxisLeft } from "~/components/elements/charts/bar/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/bar/modules/AxisBottom";
import { Bars } from "~/components/elements/charts/bar/modules/Bars";
import { maxBy as _maxBy, throttle as _throttle, isNil as _isNil } from 'lodash';
import { breakpoints } from '~/lib/theme/theme';
import { fontRoboto } from '~/app/_fonts';

interface IBarChart {
    data: {
        bars: IData[];
    };
    textColor?:string;
    fillColor?:string;
    borderColor?:string;
    borderColorDark?:string;
    suffix?:string;
}

interface IData {
    value:number;
    label:string;
}

interface IMargin {
    top:number;
    right:number;
    bottom:number;
    left:number;
}

const BarChart:any = ({ data, textColor = 'steel', borderColor = 'borderColor', borderColorDark = 'charcoal', fillColor = 'lightGrey', suffix = '' }:IBarChart) : ReactNode => {
    const desktopHeight:number = 510;
    const mobileHeight:number = 360;
    const [mediaQuery] = useMediaQuery(`(min-width: ${breakpoints.sm})`);
    const [width, setWidth] = useState<number>(null);
    const [height, setHeight] = useState<number>(mediaQuery ? desktopHeight : mobileHeight);
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
        setHasData(data && Array.isArray(data.bars) && data.bars.length > 0);
        setIsDataLoaded(true);
    }, [data]);

    useEffect(() => {
        if(!_isNil(hasData)) {
            setIsDataLoaded(true);
        }
    }, [hasData]);

    const yScale:any = useMemo<any>(() => {
        if(hasData) {
            let max:number = _maxBy(data.bars, (datum:IData) => {
                return datum.value;
            }).value;

            // Bump for aesthetics (power of 10)
            max = Math.pow(10, Math.ceil(Math.log10(max)));

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
            return scaleBand()
                .domain(data.bars.map((datum:IData) => {
                    return datum.label;
                }))
                .range([0, width])
                .padding(0.4);
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
                    hasData ? <Box visibility={isChartVisible ? 'visible' : 'hidden'} sx={{
                        '.tick': {
                            fontSize: '12px',
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
                        '.bar': {
                            fill: fillColor
                        }
                    }}>
                        <svg width={width} height={height} shapeRendering={"crispEdges"}>
                            <>
                                {
                                    (data && data.bars) && <g width={boundsWidth}
                                        height={boundsHeight}
                                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                                        overflow={"visible"}>
                                        <AxisLeft scale={yScale} chartHeight={height} width={width} suffix={suffix} />
                                        <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                                        <Bars values={data.bars} xScale={xScale} yScale={yScale} height={boundsHeight} suffix={suffix} />
                                    </g>
                                }
                            </>
                        </svg>
                    </Box> : <Alert status="info">No Data</Alert>
                }
            </>
        }
    </Box>;
};

export default BarChart;
