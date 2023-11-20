import {ReactNode} from 'react';
import {IBlock} from '~/interfaces/util/block';
import {Alert, Box, Flex, Heading} from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import {doQuery, queries} from '~/dato/api';
import {IPost} from '~/interfaces/models/post';
import LatestNewsItem from '~/components/blocks/LatestNews/LatestNewsItem';
import {SectionLinkButton} from "~/components/elements/sectionLink";
import {Column, ColumnWidth, Row} from '~/components/elements/grid/grid';
import {horizontalScrollMargin} from "~/lib/theme/theme";
import {AnimateTranslateUp} from "~/components/elements/animation/AnimateTranslateUp";
import {AnimateOverflow} from "~/components/elements/animation/AnimateOverflow";

interface ILatestNewsBlock extends IBlock {
    title:string;
    data: {
        posts:IPost[];
    }
}

const LatestNewsBlock:any = ({ background, textColor, paddingTop, paddingBottom, data: { posts } }:ILatestNewsBlock) : ReactNode => {
    return <ContentBlock background={background} color={textColor} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex align="flex-end" mb={[4, ,6, 8]}>
            <AnimateOverflow>
                <Heading as="h2" lineHeight={1} variant="sectionHeading" mb={0}>
                    Latest News
                </Heading>
            </AnimateOverflow>
            <Box flex="1" />
            <AnimateOverflow delay={0.25}>
                <SectionLinkButton href="/news">
                    All News
                </SectionLinkButton>
            </AnimateOverflow>
        </Flex>
        {
            (Array.isArray(posts) && posts.length > 0) ? <Box mr={horizontalScrollMargin} className="horizonalScroll" overflowX={[(posts.length > 3 ? 'scroll' : 'initial'), , ,'initial']} overflowY="initial">
                <Row wrap={['nowrap', , ,'wrap']}>
                    {
                        posts.map((post:IPost, index:number) => {
                            return <Column width={[ColumnWidth.EightTwelfths, , ,ColumnWidth.FourTwelvfths]} key={index}>
                                <AnimateTranslateUp offset={(index * 120)}>
                                    <LatestNewsItem {...post} />
                                </AnimateTranslateUp>
                            </Column>
                        })
                    }
                </Row>
            </Box> : <Alert status="info">No featured news…</Alert>
        }
    </ContentBlock>;
};

LatestNewsBlock.getData = async () => {
    const result:any = await doQuery(queries.latestPosts, {
        first: 6,
        filter: {
            isFeatured: {
                'eq': true
            }
        },
        orderBy: 'publishDate_DESC'
    });

    return result;
};

export default LatestNewsBlock;
