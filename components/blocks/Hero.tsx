import { ReactNode } from 'react';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import { IImage } from '~/interfaces/util/image';
import HeroVectorEffect from '~/components/elements/shapes/HeroVectorEffect';

interface IHeroBlock {
    title?:string;
    video?:IVideo;
    image?:IImage;
}

const HeroBlock:any = ({ title, video, image }:IHeroBlock) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();

    return <Box
        overflow="hidden"
        ref={contentWidthObserve}>
        {
            title && <Box h={['492px']}
                position="relative"
                backgroundImage={`url('/images/blocks/hero/background.png')`}
                backgroundPosition="center"
                backgroundSize="cover">
                <Container h={['492px']}>
                    <Flex minH="100%" align="flex-end">
                        <Heading py={8} variant="hero" position="relative" zIndex="2" maxWidth={['100vw', , '600px', '1000px']}>
                            {
                                title
                            }
                        </Heading>
                    </Flex>
                </Container>
                <Box position="absolute" top="0" left="40%" height="100%">
                    <HeroVectorEffect />
                </Box>
            </Box>
        }
        {
            (video && video?.url || image && image?.url) && <Box h={['428px', ,'600px']} position="relative">
                {
                    (() => {
                        if(video && video?.url) {
                            return <Box>
                                <AspectRatio ratio={[320 / 428, contentWidth / 600, contentWidth / 600]}>
                                    <>
                                        <video autoPlay={true} loop={true} muted={true} playsInline>
                                            <source src={video?.url} />
                                        </video>
                                        <Box
                                            background="rgba(0, 0, 0, 0.3)"
                                            position="absolute"
                                            top="0"
                                            bottom="0"
                                            left="0"
                                            right="0">
                                        </Box>
                                    </>
                                </AspectRatio>
                            </Box>;
                        }
                        else if(image && image?.url) {
                            return  <Box
                                h={['428px', '600px', '600px']}
                                backgroundImage={`url(${image?.url}?w=2400&h=930)`}
                                backgroundPosition="center"
                                backgroundSize="cover">
                            </Box>;
                        }
                    })()
                }
            </Box>
        }
    </Box>;
};

export default HeroBlock;
