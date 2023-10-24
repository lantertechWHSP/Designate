import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import { IImage } from '~/interfaces/util/image';
import HeroVectorEffect from '~/components/elements/shapes/HeroVectorEffect';

interface IHeroBlock extends IBlock {
    title?:string;
    video?:IVideo;
    image?:IImage;
}

const HeroBlock:any = ({ title, video, image }:IHeroBlock) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();
    const height:string[] = ['420px', '482px'];

    return (title || video && video?.url || image && image?.url) && <Box overflow="hidden" ref={contentWidthObserve}>
        {
            title && <Box h={height}
                          position="relative"
                          backgroundImage={`url('/images/blocks/hero/background.png')`}
                          backgroundPosition="center"
                          backgroundSize="cover">
                <Container h={height}>
                    <Flex minH="100%" align="flex-end">
                        <Heading py={[6, 8, 12]} variant="hero" position="relative" zIndex="2" maxWidth={['100vw', , '600px', '1000px']}>
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
            (video && video?.url || image && image?.url) && <Box h={['300px', '420px', ,'600px']} position="relative">
                {
                    (() => {
                        if(video && video?.url) {
                            return <Box>
                                <AspectRatio ratio={[contentWidth / 300, contentWidth / 420, , contentWidth / 600]}>
                                    <>
                                        <video autoPlay={true} loop={true} muted={true} playsInline>
                                            <source src={video?.url} />
                                        </video>
                                    </>
                                </AspectRatio>
                            </Box>;
                        }
                        else if(image && image?.url) {
                            return  <Box
                                h={['300px', '420px', ,'600px']}
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
