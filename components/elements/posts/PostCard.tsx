import { Box, Heading, Flex } from '@chakra-ui/react';
import { IPost, PostCategory } from "~/interfaces/models/post";
import { Link } from '~/components/elements/link';
import { Image } from '~/components/elements/image';
import { SectionLink } from '~/components/elements/sectionLink';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { IBlock } from '~/interfaces/util/block';
import { IImage } from '~/interfaces/util/image';
import { Icon, Icons } from '~/components/elements/icon';

interface IPostCard extends IPost {
}

const PostCard:any = ({ title, coverImage, publishDate, category, slug, blocks }:IPostCard) : any => {
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

    let postIcon:Icons;

    switch(category) {
        case PostCategory.Blog: {
            postIcon = Icons.PostCategoryBlog; break;
        }
        case PostCategory.Download: {
            postIcon = Icons.PostCategoryDownload; break;
        }
        case PostCategory.Video: {
            postIcon = Icons.PostCategoryVideo; break;
        }
        case PostCategory.Audio: {
            postIcon = Icons.PostCategoryAudio; break;
        }
        default: postIcon = null;
    }

    return <Flex direction="column" height="100%">
        <Box mb={['20px']}>
            <AnimateOpacity>
                <Link href={`/news/${slug}`} display="block" borderRadius="3px" overflow="hidden" position="relative">
                    <Image image={currentImage} ratio={[2 / 1]} />
                    <Box background="oliveBlur" position="absolute" top="0" left="0" bottom="0" right="0" />
                    {
                        postIcon && <Box position="absolute" top="20px" left="20px" color="white">
                            <Icon icon={postIcon} w={40} h={40} />
                        </Box>
                    }
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
