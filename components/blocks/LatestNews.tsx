import { ReactNode } from 'react';
// import { format, parseISO } from 'date-fns';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import ContentBlock from '~/components/blocks/Content';
import { doQuery, queries } from '~/dato/api';
import { Icon, Icons } from '~/components/elements/icon';
import { SectionLink } from '~/components/elements/sectionLink';
import { IPost } from '~/interfaces/models/post';

interface ILatestNewsBlockProps {
    data: {
        posts:IPost[];
    }
}

const LatestNewsItem:any = ({ title, publishDate }:ILatestNewsItemProps) : ReactNode => {
    // const date:Date = parseISO(publishDate);

    return <Box py={6} borderBottom="1px solid lightGrey">
        {
            // date && <Text color="lightGrey" fontSize={18} fontWeight={400} mb={0.5}>
            //     {format(date, 'dd.MM.yy')}
            // </Text>
        }
        {
            title && <Heading fontSize={24}  color="white" fontWeight={350} mb={4}>
                {title}
            </Heading>
        }
        <SectionLink>

        </SectionLink>
        {/*<Box display="inline-flex" style={{ alignItems: 'center' }} borderBottom="1px" color="white" borderColor="white">*/}
        {/*    <Text>View</Text><Icon w={12} h={12} icon={Icons.ChevronRight} />*/}
        {/*</Box>*/}

    </Box>;
};

const LatestNewsBlock:any = ({ data: { posts } }:ILatestNewsBlockProps) : ReactNode => {
    return <ContentBlock py={8} background="mutedSteel">
        <SimpleGrid columns={[1, ,2]}>
            <Box>
                {
                    <Heading variant="sectionHeading" color="white" mb={4}>
                        Latest News
                    </Heading>
                }
            </Box>
            <Box>
                {
                    (Array.isArray(posts) && posts.length > 0) && posts.map((post:ILatestNewsItemProps, index:number) => {
                        return <LatestNewsItem {...post} key={index} />;
                    })
                }
            </Box>
        </SimpleGrid>
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
