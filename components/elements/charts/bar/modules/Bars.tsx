import { ReactNode, Fragment, useState, useEffect } from 'react';
import { Popover, PopoverTrigger, Portal, PopoverContent, Box, Text } from '@chakra-ui/react';
import { Tooltip } from '~/components/elements/tooltip';
import { motion, useScroll, useAnimate } from 'framer-motion';
import {baseAnimationBezier} from "~/lib/theme/theme";
const MotionBox:any = motion(Box);


interface IBars {
    values: IData[];
    height:number;
    xScale:any;
    yScale:any;
    suffix?:any;
}

interface IData {
    value:number;
    label:string;
}

export const Bars:any = ({ values, height, xScale, yScale, suffix }:IBars) : ReactNode =>  {
    const borderRadius:number = 3;
    //
    // const { scrollYProgress } = useScroll({
    //     target: scope,
    //     offset: [`${offset}px end`, 'end']
    // });
    // const spring = useSpring(scrollYProgress, {
    //     bounce: 0,
    //     mass: 0.3,
    //     stiffness: 50
    // });
    // const [scope, animate] = useAnimate();
    //
    // const guff = (value) => {
    //     animate('rect', { height:  }, {
    //         duration: 0.5,
    //         type: "spring"
    //     })
    // }

    // useEffect(() => {
    //     setTimeout(() => {
    //
    //     }, 5000);
    // })

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 1000)
    })

    return <>
        {
            (Array.isArray(values) && values.length > 0) &&  <g className="bars">
                {
                    values.map(({ value, label }, index:number) => {
                        return <Fragment key={index} >
                            {/*<Popover placement="top" trigger="hover" isLazy>*/}
                                {/*<PopoverTrigger>*/}

                                        {/*<motion.rect rx={borderRadius}*/}
                                        {/*    ry={borderRadius}*/}
                                        {/*    className="bar"*/}
                                        {/*    style={{*/}
                                        {/*        transition: 'height 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), y 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'*/}
                                        {/*    }}*/}

                                        {/*    y={!isLoaded ? 0 : yScale.invert(value)}*/}

                                        {/*    height={!isLoaded ? 0 : Math.max(height - yScale.invert(value)  + borderRadius, 0)}*/}
                                        {/*/>*/}
                                        {/*<g overflow="hidden"*/}
                                        {/*      fill="transparent"*/}
                                        {/*      x={xScale(label)}*/}
                                        {/*      y={yScale(value) - borderRadius}*/}
                                        {/*      width={xScale.bandwidth()}*/}
                                        {/*      height={Math.max(height - yScale(value), 0)}>*/}
                                        {/*    <g clipPath={`inset(0 0 ${borderRadius}px 0)`} className="bar">*/}
                                        {/*        <rect*/}
                                        {/*            x={xScale(label)}*/}
                                        {/*            y={yScale(value)}*/}
                                        {/*            width={xScale.bandwidth()}*/}
                                        {/*            fill="white"*/}
                                        {/*            height={Math.max(height - yScale(value) + borderRadius, 0)} />*/}
                                        {/*    </g>*/}
                                        {/*</g>*/}
                                        {/*<g overflow="hidden"*/}
                                        {/*   x={xScale(label)}*/}
                                        {/*   y={yScale(value)}*/}
                                        {/*   height={(Math.max(height - yScale(value), 0))}>*/}
                                            <g clipPath={`inset(0 0 ${borderRadius}px 0)`} className="bar">
                                                <motion.rect
                                                    rx={borderRadius}
                                                    ry={borderRadius}
                                                    className="bar"
                                                    x={xScale(label)}
                                                    y={!isLoaded ? height : yScale(value)}
                                                    style={{
                                                        transition: 'height 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), y 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
                                                    }}
                                                    width={xScale.bandwidth()}
                                                    height={!isLoaded ? 0 : (Math.max(height - yScale(value)  + borderRadius, 0))}
                                                />
                                            </g>
                                        {/*</g>*/}
                                    {/*</g>*/}
                            {/*    </PopoverTrigger>*/}
                            {/*    <Portal>*/}
                            {/*        <PopoverContent>*/}
                            {/*            <Tooltip>*/}
                            {/*                <Box>*/}
                            {/*                    {label}*/}
                            {/*                </Box>*/}
                            {/*                <Box>*/}
                            {/*                    <Text mb={0} as="label" mr={2}>*/}
                            {/*                        Value:*/}
                            {/*                    </Text>*/}
                            {/*                    <Text mb={0} as="span">{value} {suffix}</Text>*/}
                            {/*                </Box>*/}
                            {/*            </Tooltip>*/}
                            {/*        </PopoverContent>*/}
                            {/*    </Portal>*/}
                            {/*</Popover>*/}
                        </Fragment>;
                    })
                }
            </g>
        }
    </>;
};
