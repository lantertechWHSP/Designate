import { ReactNode } from 'react';
import { Flex, Heading, Box, Divider } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { doQuery, queries } from '~/dato/api';
import { IPost } from '~/interfaces/models/post';
import LatestNewsItem from '~/components/blocks/LatestNews/LatestNewsItem';
import { SectionLinkButton } from "~/components/elements/sectionLink";
import { Row, Column, ColumnValues } from '~/components/elements/grid/grid';

interface ILatestNewsBlock {
    title:string;
    data: {
        posts:IPost[];
    }
}

const LatestNewsBlock:any = ({ data: { posts } }:ILatestNewsBlock) : ReactNode => {
    return <ContentBlock py={8} background="grey">
        <Divider borderColor="blackBlur" mb={8} />
        <Flex align="center" mb={8}>
            <Heading as="h2" variant="sectionHeading">
                Latest News
            </Heading>
            <Box flex="1" />
            <SectionLinkButton href="/news">
                All News
            </SectionLinkButton>
        </Flex>
        {
            (Array.isArray(posts) && posts.length > 0) && <Row>
                {
                    posts.map((post:IPost, index:number) => {
                        return <Column width={[ColumnValues.Full, , ColumnValues.Third]} key={index}>
                            <LatestNewsItem {...post} />
                        </Column>
                    })
                }
            </Row>
        }
    </ContentBlock>;
};

LatestNewsBlock.getData = async () => {
    const result:any = await doQuery(queries.posts, {
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
