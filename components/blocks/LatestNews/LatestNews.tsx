import {ReactNode} from 'react';
import {IBlock} from '~/interfaces/util/block';
import {Alert, Box, Flex, Heading} from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import {doQuery, queries} from '~/dato/api';
import {IPost} from '~/interfaces/models/post';
import LatestNewsItem from '~/components/blocks/LatestNews/LatestNewsItem';
import {SectionLinkButton} from "~/components/elements/sectionLink";
import {Column, ColumnWidth, Row} from '~/components/elements/grid/grid';

interface ILatestNewsBlock extends IBlock {
    title:string;
    data: {
        posts:IPost[];
    }
}

const LatestNewsBlock:any = ({ background, textColor, paddingTop, paddingBottom, data: { posts } }:ILatestNewsBlock) : ReactNode => {
    return <ContentBlock background={background} color={textColor} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex align="flex-end" mb={[4, ,6, 8]}>
            <Heading as="h2" lineHeight={1} variant="sectionHeading" mb={0}>
                Latest News
            </Heading>
            <Box flex="1" />
            <SectionLinkButton href="/news">
                All News
            </SectionLinkButton>
        </Flex>
        {
            (Array.isArray(posts) && posts.length > 0) ? <Box className="horizonalScroll" overflowX={['scroll', , ,'hidden']}>
                <Row wrap={['nowrap', , ,'wrap']}>
                    <Box py={[4, ,0]}>
                        {
                            posts.map((post:IPost, index:number) => {
                                return <Column width={[ColumnWidth.Half, , ,ColumnWidth.OneThird]} key={index}>
                                    <LatestNewsItem {...post} />
                                </Column>;
                            })
                        }
                    </Box>
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
