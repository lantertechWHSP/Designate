import { ReactNode } from 'react';
import { IBlock} from '~/interfaces/util/block';
import { Alert, Box, Flex, Heading } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { doQuery, queries} from '~/dato/api';
import { IPost } from '~/interfaces/models/post';
import LatestNewsItem from '~/components/blocks/LatestPosts/LatestPostItem';
import { SectionLinkButton } from "~/components/elements/sectionLink";
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { horizontalScrollMargin } from "~/lib/theme/theme";
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { remove as _remove } from 'lodash';

interface ILatestPostsPanelBlock extends IBlock {
    title:string;
    data: {
        posts:IPost[];
    }
}

const LatestPostsPanelBlock:any = ({ background, textColor, paddingTop, paddingBottom, data: { posts } }:ILatestPostsPanelBlock) : ReactNode => {
    return <ContentBlock background={background} color={textColor} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex align="flex-end" mb={[4, ,6, 8]}>
            <Heading as="h2" lineHeight={1} variant="sectionHeading" mb={0}>
                <AnimateOverflow>
                    Latest News
                </AnimateOverflow>
            </Heading>
            <Box flex="1" />
            <AnimateOverflow>
                <SectionLinkButton href="/news">
                    All News
                </SectionLinkButton>
            </AnimateOverflow>
        </Flex>
        {
            (Array.isArray(posts) && posts.length > 0) ? <Box mr={horizontalScrollMargin} className="horizonalScroll" overflowX={[posts.length > 2 ? 'scroll' : 'hidden', , ,'hidden']}>
                <Row wrap={['nowrap', , ,'wrap']}>
                    {
                        posts.map((post:IPost, index:number) => {
                            return <Column width={[ColumnWidth.EightTwelfths, , ,ColumnWidth.FourTwelvfths]} key={index}>
                                <Box mb={[0, , ,8]}>
                                    <LatestNewsItem {...post} />
                                </Box>
                            </Column>;
                        })
                    }
                </Row>
            </Box> : <Alert status="info">No featured news…</Alert>
        }
    </ContentBlock>;
};

LatestPostsPanelBlock.getData = async () => {
    const featuredPosts:IPost[] = await doQuery(queries.featuredLatestPosts, {
        orderBy: 'publishDate_DESC'
    }).then(({ featuredPostsList }) => featuredPostsList.posts || []);

    const posts:any = await doQuery(queries.latestPosts, {
        first: 6,
        orderBy: 'publishDate_DESC'
    }).then(({ posts }) => posts || []);

    featuredPosts.map((pinnedPost:IPost) => {
        _remove(posts, (post:IPost) => {
            return post.id === pinnedPost.id;
        });
    });

    return {
        posts: [...featuredPosts, ...posts].slice(0, 6)
    };
};

export default LatestPostsPanelBlock;
