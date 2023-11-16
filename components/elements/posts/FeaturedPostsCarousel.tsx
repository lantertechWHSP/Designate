import {IPost} from '~/interfaces/models/post';
import {useKeenSlider} from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import {Box, Button, Container, Flex, Heading, Text} from '@chakra-ui/react';
import {SectionLinkButton} from '~/components/elements/sectionLink';
import {useState} from 'react';
import {Icon, Icons} from '~/components/elements/icon';
import {Column, ColumnWidth, Row} from '~/components/elements/grid/grid';
import StructuredContent from "~/components/StructuredContent";
import {isEmptyDocument} from 'datocms-structured-text-utils';
import {zIndex} from "~/lib/theme/theme";

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
                                        zIndex={zIndex.featuredPosts.slide}
                                        left="0"
                                        right="0"
                                        bottom="40px">
                                        <Container>
                                            <Row>
                                                <Column width={[ColumnWidth.Full, , ,ColumnWidth.TwoThirds]}>
                                                    {
                                                        post.title && <Heading as="h1" color="white" fontSize={['30px', '40px', '50px']} lineHeight={['36px', '46px', '56px']} mb="6px">
                                                            {post.title}
                                                        </Heading>
                                                    }
                                                    {
                                                        !isEmptyDocument(post.summary) && <Text color="ghostWhite2">
                                                            <StructuredContent content={post.summary} />
                                                        </Text>
                                                    }
                                                </Column>
                                            </Row>
                                            <SectionLinkButton href={`/news/${post.slug}`} mt={8} color="white" borderColor="whiteBlur2" borderColorHover="white">
                                                Read More
                                            </SectionLinkButton>
                                        </Container>
                                    </Box>
                                </Box>
                            </Box>;
                        })
                    }
                </>
                {
                    posts.length > 1 &&  <Box position="absolute" bottom="30px" left="50%" transform="translateX(-50%)" zIndex={zIndex.featuredPosts.dots}>
                        {
                            posts.map((post:IPost, index:number) => {
                                return <Button key={index} width="8px" height="8px" mx={1}
                                    background={slideIndex === index ? 'white' : 'whiteBlur'}
                                    borderRadius="4px"
                                    onClick={() => {
                                        goToIndex(index);
                                    }} />;
                            })
                        }
                    </Box>
                }
                {
                    posts.length > 1 && <Box position="absolute" width="100%" pointerEvents="none" bottom="40px" zIndex={zIndex.featuredPosts.arrows}>
                        <Container>
                            <Flex direction="row" justify="flex-end">
                                <Flex mx={-2}>
                                    <Button
                                        pointerEvents="all"
                                        backgroundColor="whiteBlur"
                                        transition="background-color 0.3s linear"
                                        _hover={{
                                            backgroundColor: 'white'
                                        }}
                                        mx={2}
                                        color="charcoal"
                                        width={['40px', ,'56px']}
                                        height={['40px', ,'56px']}
                                        borderRadius="50%"
                                        onClick={prev}>
                                        <Icon icon={Icons.ArrowLeft} />
                                    </Button>
                                    <Button
                                        pointerEvents="all"
                                        backgroundColor="whiteBlur"
                                        transition="background-color 0.3s linear"
                                        _hover={{
                                            backgroundColor: 'white'
                                        }}
                                        mx={2}
                                        color="charcoal"
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
                }
            </>

        }
    </Box>;
};

export default FeaturedPostsCarousel;
