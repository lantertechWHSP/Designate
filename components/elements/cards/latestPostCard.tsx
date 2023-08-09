import { Box, Text, Link } from '@chakra-ui/react';

export const LatestPostCard = ({ title, date, slug }) : any => {
    return <Box>
        {
            title && <h2>
                {title}
            </h2>
        }
        {
            date && <Text as="span">
                {date}
            </Text>
        }
        {
            slug && <Link href={`/news/${slug}`}>Read More</Link>
        }
    </Box>;
};
