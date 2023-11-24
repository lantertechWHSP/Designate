import { ReactNode } from 'react';
import { IPost } from '~/interfaces/models/post';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from '~/components/elements/sectionLink';
import { Image } from '~/components/elements/image';
import { Link } from '~/components/elements/link';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';

interface ILatestNewsItem extends IPost {
}

const LatestPostItem:any = ({ title, image, publishDate, slug }:ILatestNewsItem) : ReactNode => {
    const date:string = DateTime.fromISO(publishDate).toFormat('MMM d, yyyy');

    return <Flex direction="column" height="100%">
        <AnimateOpacity>
            {
                slug ? <Link href={`news/${slug}`}>
                    <Image image={image} ratio={2/1} mb={4} borderRadius="3px" overflow="hidden" />
                </Link> : <>
                    <Image image={image} ratio={2/1} mb={4} borderRadius="3px" overflow="hidden" />
                </>
            }
        </AnimateOpacity>
        {
            slug && title ? <Link color="charcoal" href={`/news/${slug}`}>
                <Heading as="h3" fontSize={['21px']} lineHeight={['30px']}>
                    <AnimateOverflow>
                        {title}
                    </AnimateOverflow>
                </Heading>
            </Link> : title && <Heading as="h3" fontSize={['21px']} lineHeight={['30px']}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            date && <Heading as="h4" color="charcoalBlur" fontWeight={400} mb={4}>
                <AnimateOverflow>
                    {date}
                </AnimateOverflow>
            </Heading>
        }
        <Box flex="1" />
        {
            <AnimateOverflow>
                <SectionLink href={`news/${slug}`}>
                    View
                </SectionLink>
            </AnimateOverflow>
        }
    </Flex>;
};

export default LatestPostItem;
