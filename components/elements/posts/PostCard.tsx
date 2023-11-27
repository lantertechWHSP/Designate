import { Box, Heading, Flex } from '@chakra-ui/react';
import { IPost } from "~/interfaces/models/post";
import { Link } from '~/components/elements/link';
import { Image } from '~/components/elements/image';
import { SectionLink } from '~/components/elements/sectionLink';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';

interface IPostCard extends IPost {
}

const PostCard:any = ({ title, image, publishDate, slug, blocks }:IPostCard) : any => {
    let currentImage:IImage;
    if(image) {
        currentImage = image;
    }

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

    return <Flex direction="column" height="100%">
        <Box mb={['20px']}>
            <AnimateOpacity>
                <Link href={`/news/${slug}`} display="block" borderRadius="3px" overflow="hidden">
                    <Image image={currentImage} ratio={[2 / 1]} />
                </Link>
            </AnimateOpacity>
        </Box>
        {
            title && <Link href={`/news/${slug}`}>
                <Heading as="h2" fontSize={['21px']} lineHeight="22px"  color="charcoal" fontWeight={500} mb={2}>
                    <AnimateOverflow>
                        {title}
                    </AnimateOverflow>
                </Heading>
            </Link>
        }
        {
            publishDate && <Box fontSize="16px" lineHeight="22px" color="charcoalBlur" mb={6}>
                <AnimateOverflow>
                    {publishDate}
                </AnimateOverflow>
            </Box>
        }
        <Box flex="1" />
        {
            slug && <AnimateOverflow>
                <SectionLink href={`/news/${slug}`}>
                    Read
                </SectionLink>
            </AnimateOverflow>
        }
    </Flex>;
};


export default PostCard;
