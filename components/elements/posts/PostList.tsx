import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { doQuery, queries } from '~/dato/api';
import PostCard from '~/components/elements/posts/PostCard';
import { SimpleGrid, Box, Alert, Spinner, Text, Container } from '@chakra-ui/react';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';
import { throttle as _throttle } from 'lodash';

interface IPostsList {
    latestPosts:IPost[];
    postsMeta:IPostsMeta;
}

export const DATO_QUERY_VALUES:any = {
    ITEMS_PER_PAGE : 3,
    ORDER_BY : 'date_DESC',
};

const PostList:any = ({ latestPosts, postsMeta }:IPostsList) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<IPost[]>(latestPosts);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [couldNotLoadPosts, setCouldNotLoadPosts] = useState<boolean>(false);
    const [totalPostsCount] = useState<number>(postsMeta?.count);

    const [noMorePosts, setNoMorePosts] = useState(false);
    const [hideNoMorePosts, setHideNoMorePosts] = useState(false);

    const elementRef:any = useRef<ReactNode>();

    const loadMore:any = () : void => {
        if(!isLoading) {
            setIsLoading(true);

            setTimeout(() => {
                doQuery(queries.posts, { first: DATO_QUERY_VALUES.ITEMS_PER_PAGE, skip: page * DATO_QUERY_VALUES.ITEMS_PER_PAGE }).then(({ posts }) => posts || []).then((newPosts) => {
                    if(newPosts.length > 0) {
                        setPosts([...posts, ...newPosts]);
                        setPage(page + 1);
                    }
                    else {
                        setNoMorePosts(true);

                        setTimeout(() => {
                            setHideNoMorePosts(true);
                        }, 5000)
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
            }, 1000)
        }
    };

    const onScroll:any = useCallback(_throttle(() => {
        if(elementRef.current) {
            const elementOffsetBottom = elementRef.current.offsetTop + elementRef.current.getBoundingClientRect().height;
            const paddedOffset = 100;
            const windowScrollBottom = window.scrollY + window.innerHeight;

            if(windowScrollBottom >= elementOffsetBottom + paddedOffset) {
                loadMore(page);
            }
        }
    }, 100));

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [onScroll])

    return <Box bg="ghostWhite" py={12} ref={elementRef}>
        {
            (Array.isArray(posts) && posts.length > 0) ? <>
                <Box position="relative">
                    <Container>
                        <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8]}>
                            {
                                posts.map((post:any, index:number) => {
                                    return <PostCard {...post} key={index}/>;
                                })
                            }
                        </SimpleGrid>
                    </Container>
                    {
                        <Box sx={{
                            position: 'absolute',
                            display: hideNoMorePosts ? 'none' : 'block',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: ['350px'],
                            background: 'linear-gradient(0deg, rgba(248,248,248,1) 0%, rgba(248,248,248, 0.4) 20%)',
                            pointerEvents: 'none'
                        }} />
                    }
                </Box>
                <Box>
                    <Container>
                        {
                            couldNotLoadPosts && <Box status="error">
                                <Text variant="caption">Could not load posts</Text>
                            </Box>
                        }
                        {
                            (noMorePosts && !hideNoMorePosts) && <Alert status="info" mt={4}>
                                No more posts
                            </Alert>
                        }
                        {
                            (isLoading && !noMorePosts) && <Alert status="info" mt={4}>
                                Loading more <Spinner size='md' ml={4} />
                            </Alert>
                        }
                    </Container>
                </Box>
            </> : <>
                <Container>
                    <Alert status="info" mt={4}>
                        No posts…
                    </Alert>
                </Container>
            </>
        }
    </Box>;
};

export default PostList;
