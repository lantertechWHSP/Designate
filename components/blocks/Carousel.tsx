import { ReactNode } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ContentBlock from '~/components/blocks/Content';
import { IImage } from '~/interfaces/util/image';
import { Box, AspectRatio } from '@chakra-ui/react';

interface ICarouselItem {
    image:IImage;
}

interface ICarousel {
    items:ICarouselItem[];
}

const CarouselBlock:any = ({ items }:ICarousel) : ReactNode => {
    const [sliderRef] = useKeenSlider();

    return <ContentBlock py={8}>
        <Box className="keen-slider" ref={sliderRef}>
            {
                (Array.isArray(items) && items.length > 0) && items.map((item:ICarouselItem, index:number) => {
                    return <Box className="keen-slider__slide" key={index}>
                        <AspectRatio ratio={[3 / 2]}>
                            <Box backgroundImage={item.image?.responsiveImage?.src}
                                 backgroundSize="cover"
                                 backgroundPosition="center">
                            </Box>
                        </AspectRatio>
                    </Box>
                })
            }
        </Box>
    </ContentBlock>;
}

export default CarouselBlock;
