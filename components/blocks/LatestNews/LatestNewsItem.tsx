import { ReactNode } from 'react';
import { IPost } from '~/interfaces/models/post';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from '~/components/elements/sectionLink';
import { Image } from '~/components/elements/image';
import { Link } from '~/components/elements/link';

interface ILatestNewsItem extends IPost {
}

const LatestNewsItem:any = ({ title, image, publishDate, slug }:ILatestNewsItem) : ReactNode => {
    const date:string = DateTime.fromFormat(publishDate, 'yyyy-mm-dd').toFormat('DDD');

    return <Flex direction="column" py={4}>
        {
            slug ? <Link href={`news/${slug}`}>
                <Image image={image} ratio={2/1} mb={4} />
            </Link> : <>
                <Image image={image} ratio={2/1} mb={4} />
            </>
        }
        {
            slug && title ? <Link color="black" href={`/news/${slug}`}>
                <Heading as="h3" fontSize={['21px']} lineHeight={['30px']}>
                    {title}
                </Heading>
            </Link> : title && <Heading as="h3" fontSize={['21px']} lineHeight={['30px']}>
                {title}
            </Heading>
        }
        {
            date && <Heading as="h4" color="blackBlur" fontWeight={400} mb={4}>
                {date}
            </Heading>
        }
        <Box flex="1" />
        {
            <SectionLink href={`news/${slug}`}>
                View
            </SectionLink>
        }
    </Flex>;
};

export default LatestNewsItem;
