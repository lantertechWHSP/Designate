import { Box, Text, Heading } from '@chakra-ui/react';
import { IPost } from "~/interfaces/models/post";
import { ChakraProps } from '@chakra-ui/system';
import { Link } from '~/components/elements/link';
import { Image } from '~/components/elements/image';
import {SectionLink} from "~/components/elements/sectionLink";

interface IPostCard extends IPost, ChakraProps {
}

const PostCard:any = ({ title, image, publishDate, slug }:IPostCard) : any => {
    return <Box>
        <Box mb={4}>
            <Link href={`/news/${slug}`}>
                <Image image={image} ratio={[2 / 1]} />
            </Link>
        </Box>
        {
            title && <Link href={`/news/${slug}`}>
                <Heading as="h2" fontSize={['21px']} color="black" fontWeight={500} mb={2}>
                    {title}
                </Heading>
            </Link>
        }
        {
            publishDate && <Box mb={2}>
                <Text as="span" fontSize="16px" lineHeight="24px" color="blackBlur">
                    {publishDate}
                </Text>
            </Box>
        }
        {
            slug && <SectionLink href={`/news/${slug}`}>
                Read
            </SectionLink>
        }
    </Box>;
};


export default PostCard;
