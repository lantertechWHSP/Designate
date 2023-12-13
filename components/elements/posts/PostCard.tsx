import { ReactNode } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { IPost, PostCategory } from '~/interfaces/models/post';
import { Link } from '~/components/elements/link';
import { Image } from '~/components/elements/image';
import { SectionLink } from '~/components/elements/sectionLink';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';
import { Icon, Icons } from '~/components/elements/icon';
import VectorShape1 from '~/components/elements/posts/shapes/VectorShape1';
import VectorShape2 from '~/components/elements/posts/shapes/VectorShape2';
import VectorShape3 from '~/components/elements/posts/shapes/VectorShape3';

interface IPostCard extends IPost {
}

const VectorEffect:any = ({category}) : ReactNode => {
    switch(category) {
        case PostCategory.Blog: return <>
            <Box position="absolute" top="0" left="0" bottom="0" right="0">
                <VectorShape1 />
            </Box>
            <Box background="oliveBlur" position="absolute" top="0" left="0" bottom="0" right="0" />
            {
                <Box position="absolute" top="20px" left="20px" color="white">
                    <Icon icon={Icons.PostCategoryBlog} w={40} h={40} />
                </Box>
            }
        </>;
        case PostCategory.Audio: return <>
            <Box position="absolute" top="0" left="0" bottom="0" right="0">
                <VectorShape1 />
            </Box>
            <Box background="oliveBlur" position="absolute" top="0" left="0" bottom="0" right="0" />
            {
                <Box position="absolute" top="20px" left="20px" color="white">
                    <Icon icon={Icons.PostCategoryAudio} w={40} h={40} />
                </Box>
            }
        </>;
        case PostCategory.Video: return <>
            <Box position="absolute" top="0" left="0" bottom="0" right="0">
                <VectorShape2 />
            </Box>
            <Box background="oliveBlur" position="absolute" top="0" left="0" bottom="0" right="0" />
            {
                <Box position="absolute" top="20px" left="20px" color="white">
                    <Icon icon={Icons.PostCategoryVideo} w={40} h={40} />
                </Box>
            }
        </>;
        case PostCategory.Download: return <>
            <Box position="absolute" top="0" left="0" bottom="0" right="0">
                <VectorShape3 />
            </Box>
            <Box background="oliveBlur" position="absolute" top="0" left="0" bottom="0" right="0" />
            {
                <Box position="absolute" top="20px" left="20px" color="white">
                    <Icon icon={Icons.PostCategoryDownload} w={40} h={40} />
                </Box>
            }
        </>;
        default: return <></>;
    }
};

const PostCard:any = ({ title, coverImage, publishDate, category, slug, blocks }:IPostCard) : ReactNode => {
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
        <Box mb={['20px']}>
            <AnimateOpacity>
                <Link href={`/news/${slug}`} display="block" borderRadius="3px" overflow="hidden" position="relative">
                    <Image image={currentImage} ratio={[424/212]} />
                    <VectorEffect category={category} />
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
                    View
                </SectionLink>
            </AnimateOverflow>
        }
    </Flex>;
};


export default PostCard;
