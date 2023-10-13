import { ReactNode, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ContentBlock from '~/components/blocks/Content';
import { IImage } from '~/interfaces/util/image';
import { Box, AspectRatio, Button } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface ICarouselItem {
    image:IImage;
}

interface ICarouselBlock {
    items:ICarouselItem[];
}

const CarouselBlock:any = ({ items }:ICarouselBlock) : ReactNode => {

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

    return <ContentBlock py={8} background="ghostWhite">
        <Box className="keen-slider" ref={sliderRef} position="relative">
            {
                (Array.isArray(items) && items.length > 0) && <>
                    {
                        items.map((item:ICarouselItem, index:number) => {
                            return <Box className="keen-slider__slide" key={index}>
                                <AspectRatio ratio={[3 / 1.25]}>
                                    <Box
                                        backgroundImage={item.image?.responsiveImage?.src}
                                        backgroundSize="cover"
                                        backgroundPosition="center">
                                    </Box>
                                </AspectRatio>
                            </Box>;
                        })
                    }
                    <Box position="absolute" width="100%" top="50%" transform="translateY(-50%)" zIndex="2">
                        <Button position="absolute"
                            backgroundColor="whiteBlur"
                            color="black"
                            left="10px"
                            width="60px"
                            height="60px"
                            borderRadius="50%"
                            onClick={prev}>
                            <Icon icon={Icons.ChevronLeft} />
                        </Button>
                        <Button position="absolute"
                            backgroundColor="whiteBlur"
                            color="black"
                            right="10px"
                            width="60px"
                            height="60px"
                            borderRadius="50%"
                            onClick={next}>
                            <Icon icon={Icons.ChevronRight} />
                        </Button>
                    </Box>
                    <Box position="absolute" bottom="30px" left="50%" transform="translateX(-50%)" zIndex="2">
                        {
                            items.map((item:ICarouselItem, index:number) => {
                                return <Button key={index} width="8px" height="8px" mx={1}
                                    background={slideIndex === index ? 'black' : 'white'}
                                    borderRadius="4px"
                                    onClick={() => {
                                        goToIndex(index);
                                    }} />;
                            })
                        }
                    </Box>
                </>
            }

        </Box>
    </ContentBlock>;
};

export default CarouselBlock;
