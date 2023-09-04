import React, { useEffect, useMemo, useRef, useState, ReactNode }  from 'react';
import { Box } from '@chakra-ui/react';
import { scaleLinear, scaleBand } from 'd3';
import { AxisBottom } from '~/components/blocks/DividendsPanel/BarChart/AxisBottom';
import { AxisLeft } from '~/components/blocks/DividendsPanel/BarChart/AxisLeft';
import { Bars } from '~/components/blocks/DividendsPanel/BarChart/Bars';
import { maxBy as _maxBy, throttle as _throttle } from 'lodash';

interface IBarChart {
    data: IDatum[];
}

interface IDatum {
    value:number;
    label:string;
}

const BarChart = ({ data }:IBarChart) : ReactNode => {
    const [width, setWidth] = useState<number>(null);
    const [height, setHeight] = useState<number>(null);
    const margin = { top: 30, right: 30, bottom: 50, left: 0 };
    const elementRef = useRef<any>();

    const boundsWidth:number = useMemo(() => {
        return width - margin.right - margin.left;
    }, [width]);

    const boundsHeight:number = useMemo(() => {
        return height - margin.top - margin.bottom;
    }, [height]);

    const scaleY = useMemo(() => {
        if(data) {
            return scaleLinear()
                .domain([0, _maxBy(data, (datum:IDatum) => {
                    return datum.value;
                }).value])
                .range([boundsHeight, 0]);
        }
    }, [data, height]);

    const scaleX = useMemo(() => {
        if(data) {
            return scaleBand()
                .domain(data.map((datum:IDatum) => {
                    return datum.label;
                }))
                .range([0, width])
                .padding(0.5);
        }
    }, [data, width]);


    useEffect(() => {
        const setDimension = () : void => {
            if(elementRef.current) {
                const newWidth = elementRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
                setHeight(newWidth * 0.66);
            }
        };

        const handleResize = _throttle(() => {
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
                    data && <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[margin.left, margin.top].join(",")})`}
                        overflow={"visible"}
                    >
                        <AxisLeft scale={scaleY} width={width} />
                        <AxisBottom scale={scaleX} transform={`translate(0, ${boundsHeight})`} />
                        <Bars data={data} scaleX={scaleX} scaleY={scaleY} height={boundsHeight} />
                    </g>
                }
            </svg>
        }
    </Box>;
};

export default BarChart;
