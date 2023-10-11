import React, { useEffect, useMemo, useRef, useState, ReactNode, Fragment }  from 'react';
import { Box } from '@chakra-ui/react';
import { scaleLinear, scaleBand } from 'd3';
import { throttle as _throttle, maxBy as _maxBy, sum as _sum } from 'lodash';
import { AxisLeft } from '~/components/elements/charts/stackedBar/modules/AxisLeft';
import { AxisBottom } from '~/components/elements/charts/stackedBar/modules/AxisBottom';

interface IStackedBarChart {
    stackedBar:IData[];
}

interface IData {
    label:string;
    values:number[];
}

interface IMargin {
    top:number;
    right:number;
    bottom:number;
    left:number;
}

const StackedBarChart:any = ({  stackedBar }:IStackedBarChart) : ReactNode => {
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
        if(stackedBar) {
            return scaleLinear()
                .domain([0, _sum(_maxBy(stackedBar, (datum:IData) => {
                    return _sum(datum.values);
                }).values)])
                .range([boundsHeight, 0]);
        }
    }, [stackedBar, height]);

    const xScale:any = useMemo<any>(() => {
        if(stackedBar) {
            return scaleBand()
                .domain(stackedBar.map((datum:IData) => {
                    return datum.label;
                }))
                .range([0, width])
                .padding(0.5);
        }
    }, [stackedBar, width]);

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
                    <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={yScale} width={width} />
                        <g transform="translate(30, 0)">
                            <AxisBottom scale={xScale} transform={`translate(0, ${boundsHeight})`} />
                        </g>
                    </g>
                }
            </svg>
        }
    </Box>;
};

export default StackedBarChart;
