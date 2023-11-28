import { ReactNode } from 'react';
import { IPost } from '~/interfaces/models/post';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from '~/components/elements/sectionLink';
import { Image } from '~/components/elements/image';
import { Link } from '~/components/elements/link';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';

interface ILatestNewsItem extends IPost {
}

const LatestPostCard:any = ({ title, coverImage, publishDate, slug, blocks }:ILatestNewsItem) : ReactNode => {
    const date:string = DateTime.fromISO(publishDate).toFormat('MMM d, yyyy');
    let currentImage:IImage;
    if(coverImage) {
        currentImage = coverImage;
    }
    else {
        blocks.map((block:IBlock) => {
            if(block.__typename === 'ImageRecord') {
                currentImage = block['image'];
                return;
            }
            else if(block.__typename === 'TextRecord') {
                block.content.blocks.map((innerBlock:IBlock) => {
                    if(innerBlock.__typename === 'ImageRecord') {
                        currentImage = innerBlock['image'];
                        return;
                    }
                });
            }
        });
    }

    return <Flex direction="column" height="100%">
        <AnimateOpacity>
            {
                slug ? <Link href={`news/${slug}`}>
                    <Image image={currentImage} ratio={2/1} mb={4} borderRadius="3px" overflow="hidden" />
                </Link> : <>
                    <Image image={currentImage} ratio={2/1} mb={4} borderRadius="3px" overflow="hidden" />
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

export default LatestPostCard;
