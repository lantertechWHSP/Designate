import { useEffect, useRef, ReactNode } from 'react';
import { select, axisBottom } from 'd3';
import { useMediaQuery } from '@chakra-ui/react';
import { breakpoints } from '~/lib/theme/theme';
import { fontRoboto } from '~/pages/_fonts';

interface IAxisBottom {
    scale:any;
    transform:string;
}

export const AxisBottom:any = ({ scale, transform }:IAxisBottom) : ReactNode => {
    const elementRef:any = useRef<SVGGElement>(null);

    const [mdMediaQuery] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [lgMediaQuery] = useMediaQuery(`(min-width: ${breakpoints.lg})`);

    useEffect(() => {
        if (elementRef.current) {
            select(elementRef.current).call(axisBottom(scale).tickValues(scale.domain().filter((datum:any, index:number) => {
                if(lgMediaQuery) {
                    return true;
                }
                else if(mdMediaQuery) {
                    return index % 2 === 0;
                }
                return index % 3 === 0 && index !== 0;
            })));
        }
    }, [scale, lgMediaQuery, mdMediaQuery]);

    return <g className="x-axis">
        <g ref={elementRef} transform={transform} style={{ fontFamily: `${fontRoboto.style.fontFamily}` }} />
    </g>;
};
