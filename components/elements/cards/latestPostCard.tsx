import { Box, AspectRatio, Text, Link } from '@chakra-ui/react';
import { Image } from 'react-datocms';

export const LatestPostCard = ({ title, image, date, slug }) : any => {
    return <Box>
        <Box mb={2}>
            <Link href={`/news/${slug}`}>
                {
                    image ? <Image data={image.responsiveImage} /> :
                        <AspectRatio ratio={[3 / 2]}><Box background="grey" /></AspectRatio>
                }
            </Link>
        </Box>
        {
            title && <h2>
                {title}
            </h2>
        }
        {
            date && <Text as="span">
                {date}
            </Text>
        }
        {
            slug && <Link href={`/news/${slug}`}>Read More</Link>
        }
    </Box>;
};
