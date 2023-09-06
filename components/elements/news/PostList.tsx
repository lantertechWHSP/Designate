import { useState, ReactNode } from 'react';
import { doQuery, queries } from '~/dato/api';
import PostCard from '~/components/elements/news/PostCard';
import { SimpleGrid, Box, Button, Spinner, Text } from '@chakra-ui/react';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';

interface IPostsListProps {
    latestPosts:IPost[];
    postsMeta:IPostsMeta;
}

const PostList:any = ({ latestPosts, postsMeta }:IPostsListProps) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<IPost[]>(latestPosts);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false);
    const [couldNotLoadPosts, setCouldNotLoadPosts] = useState<boolean>(false);

    const [totalPosts] = useState<number>(postsMeta.count || posts.length);
    const itemsPerPage:number = 1;

    const loadMore:any = () : void => {
        setIsLoading(true);

        doQuery(queries.latestPosts, { isFeatured: true, first: itemsPerPage, skip: page * itemsPerPage }).then(({ posts }) => posts || []).then((newPosts) => {
            if(newPosts.length > 0) {
                setPosts([...posts, ...newPosts]);
                setPage(page + 1);
            }
            else {
                setTimeout(() => {
                    setNoMorePosts(true);
                }, 250);

                setTimeout(() => {
                    setNoMorePosts(false);
                }, 5000);
            }
        }).catch(() => {
            setCouldNotLoadPosts(true);
            setTimeout(() => {
                setCouldNotLoadPosts(false);
            }, 5000);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 250);
        });
    };

    return <>
        {
            (Array.isArray(posts) && posts.length > 0) ? <>
                <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8]}>
                    {
                        posts.map((post:any, index:number) => {
                            return <PostCard {...post} key={index}/>;
                        })
                    }
                </SimpleGrid>
                {
                    (noMorePosts || posts.length === totalPosts) && <Box>
                        <Text variant="caption" color="lightGrey">No more Posts to load</Text>
                    </Box>
                }
                {
                    couldNotLoadPosts && <Box>
                        <Text variant="caption" color="lightGrey">Could not load Posts</Text>
                    </Box>
                }
                {
                    posts.length < totalPosts && <Button color="sunlight" onClick={loadMore} px={0} rightIcon={isLoading && <Spinner size='sm' />}>
                        <Text textDecoration="underline">
                            Load Moar!
                        </Text>
                    </Button>
                }
            </> : <>
                <Box>
                    <Text variant="caption" color="lightGrey">No Posts</Text>
                </Box>
            </>
        }
    </>;
};

export default PostList;
