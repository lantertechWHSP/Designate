import * as d3 from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const DividendHistoryChart = () => {
    const width = 600;
    const height = 400;

    const margin = { top: 30, right: 30, bottom: 50, left: 50 };

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
    const yScale = d3.scaleLinear().domain([0, 11]).range([boundsHeight, 0]);

    return <svg width={width} height={height} shapeRendering={"crispEdges"}>
        <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[margin.left, margin.top].join(",")})`}
            overflow={"visible"}
        >
            <AxisLeft yScale={yScale} pixelsPerTick={30} />

            <g transform={`translate(0, ${boundsHeight})`}>
                <AxisBottom xScale={xScale} pixelsPerTick={60} />
            </g>
        </g>
    </svg>
};

export default DividendHistoryChart;
