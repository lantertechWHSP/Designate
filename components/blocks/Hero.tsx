import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import HeroVectorEffect from '~/components/elements/shapes/HeroVectorEffect';
import { zIndex } from "~/lib/theme/theme";
import { Skeleton } from '~/components/elements/skeleton/skeleton';
import { motion } from 'framer-motion';
const MotionHeading:any = motion(Heading);

interface IHeroBlock extends IBlock {
    title?:string;
    video?:IVideo;
}

const HeroBlock:any = ({ title, video }:IHeroBlock) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();
    const height:string[] = ['420px', '482px'];
    const [isVideoPlaying, setIsPlaying] = useState<boolean>(false);

    return (title || video && video?.url) && <Box overflow="hidden" ref={contentWidthObserve}>
        {
            title && <Box h={height}
                position="relative"
                backgroundImage={`url('/images/blocks/hero/background.png')`}
                backgroundColor="#9b9681"
                backgroundPosition="center"
                backgroundSize="cover">
                <Container h={height}>
                    <Flex minH="100%" align="flex-end">
                        {
                            <Box py={['40px', ,'50px', '60px']} position="relative" zIndex={zIndex.heroTitle} maxWidth={['100vw', , '500px', '500px']}>
                                <Box overflow="hidden">
                                    <MotionHeading variant="hero"
                                                   transition={{ ease: "easeOut", duration: 0.3 }}
                                                   initial={{ transform: 'translateY(100%)' }}
                                                   whileInView={{ transform: 'translateY(0%)' }}
                                                   viewport={{ once: true }}>
                                        Generating
                                    </MotionHeading>
                                </Box>
                                <Box overflow="hidden">
                                    <MotionHeading variant="hero"
                                                   transition={{ ease: "easeOut", duration: 0.3, delay: 0.1 }}
                                                   initial={{ transform: 'translateY(100%)' }}
                                                   whileInView={{ transform: 'translateY(0%)' }}
                                                   viewport={{ once: true }}>
                                        Enduring
                                    </MotionHeading>
                                </Box>
                                <Box overflow="hidden">
                                    <MotionHeading variant="hero"
                                                   transition={{ ease: "easeOut", duration: 0.3, delay: 0.2 }}
                                                   initial={{ transform: 'translateY(100%)' }}
                                                   whileInView={{ transform: 'translateY(0%)' }}
                                                   viewport={{ once: true }}>
                                        Success
                                    </MotionHeading>
                                </Box>
                            </Box>
                        }
                    </Flex>
                </Container>
                <Box position="absolute" top="0" left="40%" height="100%">
                    <HeroVectorEffect />
                </Box>
            </Box>
        }
        {
            video && <Box h={['300px', '420px', ,'600px']}>
                <Box visibility={(isVideoPlaying) ? 'visible' : 'hidden'} height={!isVideoPlaying ? 0 : 'initial'}>
                    <AspectRatio ratio={[contentWidth / 300, contentWidth / 420, , contentWidth / 600]}>
                        <video autoPlay={true} loop={true} muted={true} preload="auto" playsInline onPlay={() => { setIsPlaying(true); }}>
                            <source src={video?.url} />
                        </video>
                    </AspectRatio>
                </Box>
                {
                    (!isVideoPlaying) && <Box width="100%" height="100%" backgroundColor="#230d05">
                        <Skeleton width="100%" height="100%" startColor="#0f0403" endColor="#1a0505" />
                    </Box>
                }
            </Box>
        }
    </Box>;
};

export default HeroBlock;
