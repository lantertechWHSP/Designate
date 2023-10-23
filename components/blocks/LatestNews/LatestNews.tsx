import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import { Flex, Heading, Box, Text } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { doQuery, queries } from '~/dato/api';
import { IPost } from '~/interfaces/models/post';
import LatestNewsItem from '~/components/blocks/LatestNews/LatestNewsItem';
import { SectionLinkButton } from "~/components/elements/sectionLink";
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

interface ILatestNewsBlock extends IBlock, ChakraProps {
    title:string;
    data: {
        posts:IPost[];
    }
}

const LatestNewsBlock:any = ({ background, color, paddingTop, paddingBottom, data: { posts } }:ILatestNewsBlock) : ReactNode => {
    return <ContentBlock background={background} color={color} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex align="center" mb={[4, ,8]}>
            <Heading as="h2" variant="sectionHeading">
                Latest News
            </Heading>
            <Box flex="1" />
            <SectionLinkButton href="/news">
                All News
            </SectionLinkButton>
        </Flex>
        {
            (Array.isArray(posts) && posts.length > 0) ? <Row>
                {
                    posts.map((post:IPost, index:number) => {
                        return <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]} key={index}>
                            <LatestNewsItem {...post} />
                        </Column>;
                    })
                }
            </Row> : <Text variant="caption">No latest news found…</Text>
        }
    </ContentBlock>;
};

LatestNewsBlock.getData = async () => {
    const result:any = await doQuery(queries.latestPosts, {
        first: 3,
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
