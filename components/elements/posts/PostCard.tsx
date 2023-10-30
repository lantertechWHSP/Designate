import { Box, Text, Heading } from '@chakra-ui/react';
import { IPost } from "~/interfaces/models/post";
import { Link } from '~/components/elements/link';
import { Image } from '~/components/elements/image';
import { SectionLink } from '~/components/elements/sectionLink';

interface IPostCard extends IPost {
}

const PostCard:any = ({ title, image, publishDate, slug }:IPostCard) : any => {
    return <Box>
        <Box mb={['20px']}>
            <Link href={`/news/${slug}`} display="block" borderRadius="3px" overflow="hidden">
                <Image image={image} ratio={[2 / 1]} />
            </Link>
        </Box>
        {
            title && <Link href={`/news/${slug}`}>
                <Heading as="h2" fontSize={['21px']} lineHeight="22px"  color="black" fontWeight={500} mb={2}>
                    {title}
                </Heading>
            </Link>
        }
        {
            publishDate && <Box mb={2} fontSize="16px" lineHeight="22px" color="blackBlur" mb={6}>
                {publishDate}
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
