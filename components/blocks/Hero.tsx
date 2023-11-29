import { ReactNode, useState, useEffect, Fragment } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import HeroVectorEffect from '~/components/elements/shapes/HeroVectorEffect';
import { zIndex } from "~/lib/theme/theme";
import { Skeleton } from '~/components/elements/skeleton/skeleton';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IHeroBlock extends IBlock {
    title?:string;
    video?:IVideo;
}

const InlineVideo:any = ({ url, onPlay, contentWidth }) => {
    let videoContainer:HTMLVideoElement;

    useEffect(() => {
        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;
        video.preload = 'auto';
        video.muted = true;
        video.setAttribute('playsinline', 'true');
        video.addEventListener('play', () => {
            onPlay();
        });

        const source = document.createElement('source');
        source.src = url;
        source.type = 'video/mp4';
        video.appendChild(source);
        videoContainer.children[0].appendChild(video);

        return () => {
            if(videoContainer && videoContainer.children[0]) {
                while (videoContainer.children[0].firstChild) {
                    videoContainer.children[0].removeChild(videoContainer.children[0].lastChild);
                }
            }
        }
    }, [])

    return <Box ref={(ref) => { videoContainer = ref; }}>
        <AspectRatio ratio={[contentWidth / 300, contentWidth / 420, , contentWidth / 600]}>
            <Fragment />
        </AspectRatio>
    </Box>
}

const HeroBlock:any = ({ title, video }:IHeroBlock) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();
    const height:string[] = ['420px', '482px'];
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

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
                        <Heading py={['40px', ,'50px', '60px']} variant="hero" position="relative" zIndex={zIndex.heroTitle} maxWidth={['100vw', , '500px', '500px']}>
                            <AnimateOverflow>
                                {title}
                            </AnimateOverflow>
                        </Heading>
                    </Flex>
                </Container>
                <Box position="absolute" top="0" left="40%" height="100%">
                    <HeroVectorEffect />
                </Box>
            </Box>
        }
        {
            (video && video?.url) && <Box h={['300px', '420px', ,'600px']}>
                <Box visibility={(isVideoPlaying) ? 'visible' : 'hidden'} height={!isVideoPlaying ? 0 : 'initial'}>
                  <AspectRatio ratio={[contentWidth / 300, contentWidth / 420, , contentWidth / 600]}>
                    <video autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto" >
                      <source src={video?.url} />
                    </video>
                  </AspectRatio>
                  <InlineVideo url={video.url} onPlay={() => {
                      setIsVideoPlaying(true);
                  }} contentWidth={contentWidth} />
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
