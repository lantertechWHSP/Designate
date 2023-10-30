import { IPost } from '~/interfaces/models/post';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Flex, Container, Heading, Text, Box, Button } from '@chakra-ui/react';
import { SectionLinkButton } from '~/components/elements/sectionLink';
import { useState } from 'react';
import { Icon, Icons } from '~/components/elements/icon';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

interface IFeaturedPostsCarousel {
    posts:IPost[];
}

const FeaturedPostsCarousel:any = ({ posts }:IFeaturedPostsCarousel) : any => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        defaultAnimation: {
            duration: 750,
            easing: (x:number) => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            }
        },
    }, [
        (slider) => {
            slider.on("created", () => {
                setSlideIndex(slider.track.details.rel);
            });
            slider.on("slideChanged", () => {
                setSlideIndex(slider.track.details.rel);
            });
        },
    ]);

    const prev:any = () : void => {
        if(instanceRef.current) {
            instanceRef.current.prev();
        }
    };

    const next:any = () : void => {
        if(instanceRef.current) {
            instanceRef.current.next();
        }
    };

    const goToIndex:any = (index:number) : void => {
        if(instanceRef.current) {
            instanceRef.current.moveToIdx(index);
        }
    };

    return <Box className="keen-slider" ref={sliderRef}>
        {
            (Array.isArray(posts) && posts.length > 0) && <>
                <>
                    {
                        posts.map((post:IPost, index:number) => {
                            return <Box className="keen-slider__slide" key={index}>
                                <Box height="550px">
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
                                        bottom="40px">
                                        <Container>
                                            <Row>
                                                <Column width={[ColumnWidth.Full, ,ColumnWidth.TwoThirds]}>
                                                    <Box maxWidth="900px">
                                                        {
                                                            post.title && <Heading as="h1" color="white" fontSize={['50px']} lineHeight="56px" mb="6px">
                                                                {post.title}
                                                            </Heading>
                                                        }
                                                        {
                                                            post.excerpt && <Text color="ghostWhite2">
                                                                {post.excerpt}
                                                          </Text>
                                                        }
                                                    </Box>
                                                </Column>
                                            </Row>
                                            <SectionLinkButton href={`/news/${post.slug}`} mt={8} color="white" borderColor="whiteBlur">
                                                Read More
                                            </SectionLinkButton>
                                        </Container>
                                    </Box>
                                </Box>
                            </Box>;
                        })
                    }
                </>
                <Box position="absolute" bottom="30px" left="50%" transform="translateX(-50%)" zIndex="3">
                    {
                        posts.map((post:IPost, index:number) => {
                            return <Button key={index} width="8px" height="8px" mx={1}
                                background={slideIndex === index ? 'white' : 'whiteBlur'}
                                borderRadius="3px"
                                onClick={() => {
                                    goToIndex(index);
                                }} />;
                        })
                    }
                </Box>

                <Box position="absolute" width="100%" bottom="40px" zIndex="2">
                    <Container>
                        <Flex direction="row" justify="flex-end">
                            <Flex mx={-2}>
                                <Button
                                    backgroundColor="whiteBlur"
                                    transition="background-color 0.3s linear"
                                    _hover={{
                                        backgroundColor: 'white'
                                    }}
                                    mx={2}
                                    color="black"
                                    width={['40px', ,'56px']}
                                    height={['40px', ,'56px']}
                                    borderRadius="50%"
                                    onClick={prev}>
                                    <Icon icon={Icons.ArrowLeft} />
                                </Button>
                                <Button
                                    backgroundColor="whiteBlur"
                                    transition="background-color 0.3s linear"
                                    _hover={{
                                        backgroundColor: 'white'
                                    }}
                                    mx={2}
                                    color="black"
                                    width={['40px', ,'56px']}
                                    height={['40px', ,'56px']}
                                    borderRadius="50%"
                                    onClick={next}>
                                    <Icon icon={Icons.ArrowRight} />
                                </Button>
                            </Flex>
                        </Flex>
                    </Container>
                </Box>
            </>

        }
    </Box>;
};

export default FeaturedPostsCarousel;
