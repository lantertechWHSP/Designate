import { ReactNode, useEffect, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import HeroVectorEffect from '~/components/elements/shapes/HeroVectorEffect';

interface IHeroBlock extends IBlock {
    title?:string;
    video?:IVideo;
}

const HeroBlock:any = ({ title, video }:IHeroBlock) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();
    const height:string[] = ['420px', '482px'];

    const [isVideoPlaying, setIsPlaying] = useState(false);
    const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const image:HTMLImageElement = new Image();
        image.src = '/images/blocks/hero/background.png';
        image.onload = () => {
            setIsBackgroundLoaded(true);
        };

        setBackgroundImg(image);
    }, []);

    return (title || video && video?.url) && <Box overflow="hidden" ref={contentWidthObserve}>

        {
            (title && (video && isVideoPlaying || !video)) ? <Box h={height}
                position="relative"
                backgroundImage={`url(${backgroundImg.src})`}
                backgroundPosition="center"
                backgroundSize="cover">
                <Container h={height}>
                    <Flex minH="100%" align="flex-end">
                        <Heading py={['40px', ,'50px', '60px']} variant="hero" position="relative" zIndex="2" maxWidth={['100vw', , '500px', '500px']}>
                            {
                                title
                            }
                        </Heading>
                    </Flex>
                </Container>
                <Box position="absolute" top="0" left="40%" height="100%">
                    <HeroVectorEffect />
                </Box>
            </Box> : <Box h={height}/>
        }
        {
            (video) && <Box h={['300px', '420px', ,'600px']} visibility={(isBackgroundLoaded && isVideoPlaying) ? 'visible' : 'hidden'} position="relative">
                <AspectRatio ratio={[contentWidth / 300, contentWidth / 420, , contentWidth / 600]}>
                    <video autoPlay={true} loop={true} muted={true} preload="auto" playsInline onPlay={() => { setIsPlaying(true); }}>
                        <source src={video?.url} />
                    </video>
                </AspectRatio>
            </Box>
        }

    </Box>;
};

export default HeroBlock;
