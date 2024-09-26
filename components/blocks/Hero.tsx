import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import HeroVectorEffect from '~/components/elements/shapes/HeroVectorEffect';
import { zIndex } from "~/lib/theme/theme";
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IHeroBlock extends IBlock {
    title?:string;
    video?:IVideo;
}

const HeroBlock:any = ({ title, video }:IHeroBlock) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();
    const height:string[] = ['420px', '482px'];

    const [isVisible, setIsVisible] = useState(false);

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
            (video && video?.url) && <Box >
                <AspectRatio ratio={[contentWidth / 300, contentWidth / 420, ,contentWidth / 600, contentWidth / (contentWidth * 0.40)]}>
                    <>
                        <video autoPlay={true} loop={true} muted={true} playsInline onPlay={() => {
                            setIsVisible(true);
                        }} style={{
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}>
                            <source src={video?.url}/>
                        </video>
                        <Box sx={{
                            visibility: isVisible ? 'hidden' : 'visible',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            bottom: '0',
                            right: '0',
                            backgroundImage: `url(${video.video?.thumbnailUrl}?time=0)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        </Box>
                    </>
                </AspectRatio>
            </Box>
        }
    </Box>;
};

export default HeroBlock;
