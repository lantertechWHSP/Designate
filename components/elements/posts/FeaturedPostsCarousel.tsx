import { IPost } from '~/interfaces/models/post';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Flex, Button, Container, Heading, Text, Box } from '@chakra-ui/react';
import { DatoLink } from '~/components/elements/datoLink';

interface IFeaturedPostsCarousel {
    posts:IPost[];
}

const FeaturedPostsCarousel:any = ({ posts }:IFeaturedPostsCarousel) : any => {
    const [sliderRef, instanceRef] = useKeenSlider();
    

    return <Box className="keen-slider" ref={sliderRef}>
        {
            (Array.isArray(posts) && posts.length > 0) && posts.map((post:IPost) => {
                return <Box className="keen-slider__slide">
                    <Box minH={"calc(100vh - 120px)"}>
                        <Flex position="absolute"
                              top="0"
                              bottom="0"
                              left="0"
                              right="0"
                              backgroundImage={post?.image?.responsiveImage?.src}
                              backgroundSize="cover"
                              backgroundPosition="center" />
                        <Box background="linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)"
                             position="absolute"
                             top="0"
                             bottom="0"
                             left="0"
                             right="0" />
                        <Box position="absolute"
                             zIndex="2"
                             left="0"
                             right="0"
                             bottom="120px">
                            <Container >
                                <Box maxWidth="900px">
                                    <Heading as="h1" variant="h1" fontWeight="400" color="ghostWhite2" mb="6px">
                                        {post.title}
                                    </Heading>
                                    <Text color="ghostWhite2">
                                        {post.excerpt}
                                    </Text>
                                </Box>
                                <DatoLink w="200px"
                                          background="skyBlue"
                                          href={`news/${post.slug}`}
                                          color="white"
                                          textAlign="center"
                                          display="block"
                                          lineHeight="50px"
                                          px={4}
                                          py={0}>
                                    Read More
                                </DatoLink>
                            </Container>
                        </Box>
                    </Box>
                </Box>
            })
        }
    </Box>;
};

export default FeaturedPostsCarousel;
