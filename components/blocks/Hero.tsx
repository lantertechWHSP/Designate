import { ReactNode } from 'react';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/react';
import useDimensions from 'react-cool-dimensions';
import { IVideo } from '~/interfaces/util/video';
import { IImage } from '~/interfaces/util/image';

interface IHeroBlockProps {
    title?:string;
    video?:IVideo;
    image?:IImage;
}

const HeroBlock:any = ({ title, video, image }:IHeroBlockProps) : ReactNode => {
    const { observe: contentWidthObserve, width: contentWidth } = useDimensions();

    return <Box
        position="relative"
        overflow="hidden"
        ref={contentWidthObserve}>
        {
            (() => {
                if(video && video?.url) {
                    return <Box>
                        <AspectRatio ratio={[320 / 428, contentWidth / 800, contentWidth / 840]}>
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
                        h={['428px', '800px', '840px']}
                        backgroundImage={`url(${image?.url}?w=2400&h=930)`}
                        backgroundPosition="center"
                        backgroundSize="cover">
                    </Box>;
                }
            })()
        }
        <Flex>
            <Container position="relative" minW="1380px">
                <Flex
                    direction="column"
                    position="absolute"
                    bottom={['30px','60px', ,'90px']}
                    alignItems="left"
                    zIndex={2}>
                    <Heading as="h1" fontSize="70px" fontWeight={300} lineHeight={1.1} maxWidth={['100vw', , '600px', '900px']} color="white">{title}</Heading>
                </Flex>
            </Container>
        </Flex>
    </Box>;
};

export default HeroBlock;
