import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom, timeMonth } from 'd3';
import { useMediaQuery } from '@chakra-ui/react';
import { breakpoints } from '~/lib/theme/theme';
import { fontRoboto } from '~/app/_fonts';
import { DateTime } from 'luxon';

interface IAxisBottom {
    scale:any;
    transform:string;
}

export const AxisBottom:any = ({ scale, transform }:IAxisBottom) : ReactNode => {
    const elementRef:any = useRef<SVGGElement>(null);
    const [mdMediaQuery] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    // const [lgMediaQuery] = useMediaQuery(`(min-width: ${breakpoints.lg})`);

    useEffect(() => {
        if (elementRef.current) {
            let currentYear:string;
            const modulo:number = mdMediaQuery ? 12 : 24;
            // @ts-ignore
            select(elementRef.current).call(axisBottom(scale).ticks(timeMonth.every(1)).tickFormat((value, index, data) => {
                if(index % modulo === 0 || index === data.length - 1) {
                    const newYear:string = DateTime.fromJSDate(value).toFormat('yyyy');

                    if(currentYear !== newYear) {
                        currentYear = newYear;
                        return newYear;
                    }
                }
                return '';
            }));
        }
    }, [scale, mdMediaQuery]);

    return <g className="x-axis" >
        <g ref={elementRef} transform={transform} style={{ fontFamily: `${fontRoboto.style.fontFamily}` }} />
    </g>;
};
