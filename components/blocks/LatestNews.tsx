import { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { Box, Heading, Text, SimpleGrid, Divider } from '@chakra-ui/react';
import ContentBlock from "~/components/blocks/Content";
import { doQuery, queries } from '~/dato/api';
import {Icon, Icons} from "~/components/elements/icon";

const LatestNewsItem = ({title, publishDate }) => {
    const date = parseISO(publishDate);

    return <Box py={6} borderBottom="1px solid grey">
        {
            date && <Text color="grey" fontSize={18} fontWeight={400} mb={0.5}>
                {format(date, 'dd.MM.yy')}
            </Text>
        }
        {
            title && <Heading fontSize={24}  color="white" fontWeight={350} mb={4}>
                {title}
            </Heading>
        }
        <Box display="inline-flex" style={{ alignItems: 'center' }} borderBottom="1px" color="white" borderColor="white">
            <Text>View</Text><Icon w={12} h={12} icon={Icons.ChevronRight} />
        </Box>
    </Box>
}

const LatestNewsBlock = ({ title, data: { posts } }) : ReactNode => {
    return <ContentBlock py={8} background="mutedSteel">
        <SimpleGrid columns={[1, ,2]}>
            <Box>
                {
                    title && <Heading variant="sectionHeading" color="white" mb={4}>
                        {title}
                  </Heading>
                }
            </Box>
            <Box>
                {
                    (Array.isArray(posts) && posts.length > 0) && posts.map((post, index:number) => {
                        console.log(post);
                        return <LatestNewsItem {...post} key={index} />
                    })
                }
            </Box>
        </SimpleGrid>
    </ContentBlock>;
};

LatestNewsBlock.getData = async () => {
    const result = await doQuery(queries.latestPosts, {
        first: 3,
        isFeatured: true
    });

    return result;
};

export default LatestNewsBlock;
