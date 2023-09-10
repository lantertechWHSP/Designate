import { Box, AspectRatio, Text, Heading } from '@chakra-ui/react';
import { Image } from 'react-datocms';
import { IPost } from "~/interfaces/models/post";
import { ChakraProps } from '@chakra-ui/system';
import { DatoLink } from '~/components/elements/DatoLink';

interface IPostCardProps extends IPost, ChakraProps {
}

const PostCard:any = ({ title, image, publishDate, slug }:IPostCardProps) : any => {
    return <Box>
        <Box mb={2}>
            <DatoLink href={`/news/${slug}`}>
                {
                    image ? <Image data={image.responsiveImage} /> : <AspectRatio ratio={[3 / 2]}><Box background="lightGrey" /></AspectRatio>
                }
            </DatoLink>
        </Box>
        {
            title && <Heading as="h2" variant="h4">
                {title}
            </Heading>
        }
        {
            publishDate && <Box>
                <Text as="span" fontSize="16px" lineHeight="24px" color="steelBlue3">
                    {publishDate}
                </Text>
            </Box>
        }
        {
            slug && <DatoLink href={`/news/${slug}`}>Read</DatoLink>
        }
    </Box>;
};


export default PostCard;
