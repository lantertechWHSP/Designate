import { useRef, useCallback, useState, useEffect, Fragment } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { bisector, pointer } from 'd3';
import { Tooltip } from '~/components/elements/tooltip';

interface IChartToolip {
    xScale?:any;
    yScale?:any;
    width?:number;
    height?:number;
    boundsWidth?:number;
    boundsHeight?:number;
    data?:any;
    transform?:string;
    tooltipLegendBorderColor?:string;
    tooltipPointFillColor?:string;
}

interface IPoint {
    x?:number;
    y?:number;
    tooltipX?:number;
    tooltipY?:number;
}

export const ChartTooltip:any = ({ xScale, yScale, width, height, data, transform, tooltipLegendBorderColor = 'transparent', tooltipPointFillColor = 'charcoal' }:IChartToolip) => {
    const chartRef:any = useRef<HTMLElement>();
    // All the lines
    const [values, setValues] = useState([]);
    const [indicatorOpacity, setIndicatorOpacity] = useState(0);
    const [point, setPoint] = useState<IPoint>({});
    const [sortedData, setSortedData] = useState([]);
    const tooltipWidth:number = 300;

    useEffect(() => {
        const newSortedData:any = [];
        data.map((datum) => {
            const sorted:any = datum.data.sort((a, b) => {
                return a.date.valueOf() - b.date.valueOf();
            });

            newSortedData.push({
                ...datum,
                data: sorted
            });
        });

        setSortedData(newSortedData);
    }, [data]);

    const followPoints:any = useCallback((event:any) => {
        const [x] = pointer(event);
        const xDate:any = xScale.invert(x);
        const bisectDate:any = bisector((datum:any) => datum.date.valueOf()).left;

        const newValues:any = [];

        sortedData.map((sortedDatum) => {
            const x0:any = bisectDate(sortedDatum.data, xDate.valueOf(), 1);
            const d0:any = sortedDatum.data[x0];

            newValues.push({
                x: xScale(d0.date),
                y: yScale(d0.value),
                value: d0.value,
                line: {
                    label: sortedDatum.label,
                    display: sortedDatum.display,
                    fill: sortedDatum.fill
                }
            });
        });

        // Dot
        const xValue:number = newValues[0].x;
        const yValue:number = newValues[0].y;

        // Toolip
        let toolTipX:number;
        let toolTipY:number;
        // Line height of 30 + another 30 per point
        const tooltipHeight:number = (30 + (30 * values.filter(point => point.line?.display).length));

        // Calculate tooltipX
        if(xValue <= tooltipWidth) {
            toolTipX = 0;
        }
        else if((width - xValue) < tooltipWidth) {
            toolTipX = xValue - tooltipWidth;
        }
        else {
            toolTipX = xValue;
        }

        // Calculate tooltipY
        // Above the dot (when the toolip goes past the bottom of the char)
        if((Math.abs(yValue - height) < tooltipHeight + 30)) {
            toolTipY = yValue - tooltipHeight - 30;
        }
        // Below the dot
        else {
            toolTipY = yValue + 30;
        }

        setValues(newValues);
        setPoint({
            x: xValue,
            y: yValue,
            tooltipX: toolTipX,
            tooltipY: toolTipY,
        });
    }, [sortedData]);

    return <g transform={transform}>
        <Box as="rect" width={width} height={height} ref={chartRef} opacity={0} onMouseOver={() => {
            setIndicatorOpacity(1);
        }} onMouseMove={followPoints} onMouseOut={() => {
            setIndicatorOpacity(0);
        }}>
        </Box>
        {
            (Array.isArray(values) && values.length > 0) && <g opacity={indicatorOpacity} pointerEvents="none">
                <g transform={`translate(${point.x}, ${point.y})`}>
                    <Box as="circle" r={18} fill="white" fillOpacity="0.5" />
                    <Box as="circle" r={6} fill="olive" />
                    <Box as="circle" r={2} fill={tooltipPointFillColor} />
                </g>
                <g transform={`translate(${point.tooltipX}, ${point.tooltipY})`}>
                    <foreignObject width={tooltipWidth} height={30 + (30 * values.filter(point => point.line?.display).length)}>
                        <Tooltip>
                            {
                                values.map((value, index) => {
                                    return <Fragment key={index}>
                                        {
                                            value.line?.display && <Flex direction="row" align="center" justify="space-between" key={index}>
                                                <Flex direction="row" align="center">
                                                    <Box background={value.line.fill} width="8px" height="8px" borderRadius="4px" border="1px solid" borderColor={tooltipLegendBorderColor} mr={2} />
                                                    <Text mb={0}>
                                                        {value.line.label}
                                                    </Text>
                                                </Flex>
                                                <Box>
                                                    {value.value}
                                                </Box>
                                            </Flex>
                                        }
                                    </Fragment>;
                                })
                            }
                        </Tooltip>
                    </foreignObject>
                </g>
            </g>
        }
    </g>;
};
