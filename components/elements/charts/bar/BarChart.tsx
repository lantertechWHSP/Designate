import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box } from '@chakra-ui/react';
import { scaleLinear, scaleBand } from 'd3';
import { AxisLeft } from "~/components/elements/charts/bar/modules/AxisLeft";
import { AxisBottom } from "~/components/elements/charts/bar/modules/AxisBottom";
import { Bars } from "~/components/elements/charts/bar/modules/Bars";

import { maxBy as _maxBy, throttle as _throttle } from 'lodash';

interface IBarChart {
    data: {
        bars: IData[];
    };
    textColor?:string;
    fillColor?:string;
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

const BarChart:any = ({ data, textColor = 'darkBrown', borderColor = 'lightGrey2', fillColor = 'lightGrey' }:IBarChart) : ReactNode => {
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
        if(data && data.bars) {

            let max:number = _maxBy(data.bars, (datum:IData) => {
                return datum.value;
            }).value;

            max *= 1.3;

            return scaleLinear()
                .domain([0, max])
                .range([boundsHeight, 0]);
        }
    }, [data, height]);

    const xScale:any = useMemo<any>(() => {
        if(data && data.bars) {
            return scaleBand()
                .domain(data.bars.map((datum:IData) => {
                    return datum.label;
                }))
                .range([0, width])
                .padding(0.5);
        }
    }, [data, width]);

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
            '.bar': {
                fill: fillColor
            }
        }}>
        {
            (boundsWidth && boundsHeight) && <svg width={width} height={height} shapeRendering={"crispEdges"}>
                {
                    (data && data.bars) && <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={yScale} chartHeight={height} width={width} />
                        <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                        <Bars values={data.bars} xScale={xScale} yScale={yScale} height={boundsHeight} />
                    </g>
                }
            </svg>
        }
    </Box>;
};

export default BarChart;
