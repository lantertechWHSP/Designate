import { ReactNode } from 'react';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import { IImage } from '~/interfaces/util/image';

interface IHeroBlock {
    title?:string;
    video?:IVideo;
    image?:IImage;
}

const VectorEffect:any = () : ReactNode => {
    return <svg height="100%" viewBox="0 0 531 482" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2059 1336.07L407.624 934.939C571.33 768.023 571.321 497.4 407.624 330.503L111.226 632.721L-282.199 1033.85L14.2059 1336.07Z" fill="url(#paint0_linear_4298_6245)"/>
        <path d="M14.2067 -674.8L407.625 -273.668C571.33 -106.753 571.321 163.87 407.625 330.767L111.227 28.5495L-282.2 -372.582L14.2067 -674.8Z" fill="url(#paint1_linear_4298_6245)"/>
        <defs>
            <linearGradient id="paint0_linear_4298_6245" x1="593.971" y1="456.199" x2="146.708" y2="490.18" gradientUnits="userSpaceOnUse">
                <stop stop-color="#50513C"/>
                <stop offset="1" stop-color="#E4DDC1"/>
            </linearGradient>
            <linearGradient id="paint1_linear_4298_6245" x1="18.9204" y1="-23.7722" x2="369.727" y2="365.04" gradientUnits="userSpaceOnUse">
                <stop offset="0.0887029" stop-color="#50513C"/>
                <stop offset="1" stop-color="#E4DDC1"/>
            </linearGradient>
        </defs>
    </svg>;
};

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
                    <VectorEffect />
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
