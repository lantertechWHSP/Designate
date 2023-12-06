import { useEffect, useRef, ReactNode, useState } from 'react';
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
    const [className, setClassName] = useState('');

    useEffect(() => {
        if (elementRef.current) {
            let currentYear:string;
            const modulo:number = 24;
            mdMediaQuery ? setClassName('') : setClassName('compact');
            // @ts-ignore
            select(elementRef.current).call(axisBottom(scale).ticks(timeMonth.every(1)).tickFormat((value, index, data) => {
                if(index % modulo === 0 || index === data.length - 1) {
                    const newYear:string = DateTime.fromJSDate(value).toFormat('yyyy');

                    if(currentYear !== newYear) {
                        currentYear = newYear;
                        return newYear;
                    }
                    return null;
                }
                return null;
            }));
        }
    }, [scale, mdMediaQuery]);

    return <g className={`x-axis ${className}`}>
        <g ref={elementRef} transform={transform} style={{ fontFamily: `${fontRoboto.style.fontFamily}` }} />
    </g>;
};
