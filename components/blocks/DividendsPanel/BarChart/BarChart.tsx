import { scaleLinear, scaleBand } from 'd3';
import React, { useMemo }  from 'react';
import { Box } from '@chakra-ui/react';
import { AxisBottom } from "~/components/blocks/DividendsPanel/BarChart/AxisBottom";
import { AxisLeft } from "~/components/blocks/DividendsPanel/BarChart/AxisLeft";
import {Bars} from "~/components/blocks/DividendsPanel/BarChart/Bars";
import { maxBy as _maxBy } from 'lodash';

const BarChart = ({ data }) => {
    const width = 1300;
    const height = 700;
    const margin = { top: 30, right: 30, bottom: 50, left: 0 };

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    const scaleY = useMemo(() => {
        if(data) {
            return scaleLinear()
                .domain([0, _maxBy(data, (datum) => {
                    return datum.value;
                }).value])
                .range([boundsHeight, 0])
        }
    }, [data]);

    const scaleX = useMemo(() => {
        if(data) {
            return scaleBand()
                .domain(data.map(({ label }) => label))
                .range([0, width])
                .padding(0.5);
        }
    }, [data])

    return <Box sx={{
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
            <svg width={width} height={height} shapeRendering={"crispEdges"}>
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
    </Box>
};

export default BarChart;
