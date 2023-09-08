import { ReactNode } from 'react';
import { IPost } from '~/interfaces/models/post';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from '~/components/elements/sectionLink';

interface ILatestNewsItem extends IPost {
}

const LatestNewsItem:any = ({ title, publishDate, slug }:ILatestNewsItem) : ReactNode => {
    const date:string = DateTime.fromFormat(publishDate, 'yyyy-mm-dd').toFormat('DDD');

    return <Flex direction="column" borderTop="1px solid" borderColor="lightGrey2" py={4}>
        {
            title && <Heading as="h3">
                {title}
            </Heading>
        }
        {
            date && <Heading as="h4" color="steelBlue3" fontWeight={400} mb={8}>
                {date}
            </Heading>
        }
        <Box flex="1" />
        {
            <SectionLink href={`news/${slug}`}>
                View
            </SectionLink>
        }
    </Flex>
}

export default LatestNewsItem;
