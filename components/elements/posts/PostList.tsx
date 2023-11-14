import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { doQuery, queries } from '~/dato/api';
import PostCard from '~/components/elements/posts/PostCard';
import { SimpleGrid, Box, Alert, Container } from '@chakra-ui/react';
import { IPost } from '~/interfaces/models/post';
import { IPostsMeta } from '~/interfaces/models/postsMeta';
import { throttle as _throttle } from 'lodash';

interface IPostsList {
    latestPosts?:IPost[];
    postsMeta?:IPostsMeta;
}

export const DATO_QUERY_VALUES:any = {
    ITEMS_PER_PAGE : 9,
    ORDER_BY : 'date_DESC',
};

const PostList:any = ({ latestPosts }:IPostsList) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<IPost[]>(latestPosts);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [couldNotLoadPosts, setCouldNotLoadPosts] = useState<boolean>(false);

    const [noMorePosts, setNoMorePosts] = useState(false);

    const elementRef:any = useRef<ReactNode>();

    const loadMore:any = () : void => {
        if(!isLoading) {
            setIsLoading(true);

            setTimeout(() => {
                doQuery(queries.posts, {
                    first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
                    skip: page * DATO_QUERY_VALUES.ITEMS_PER_PAGE,
                    orderBy: 'publishDate_DESC'
                }).then(({ posts }) => posts || []).then((newPosts) => {
                    if(newPosts.length > 0) {
                        setPosts([...posts, ...newPosts]);
                        setPage(page + 1);
                    }
                    else {
                        setNoMorePosts(true);
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
            }, 1000);
        }
    };

    const onScroll:any = useCallback(_throttle(() => {
        if(elementRef.current && !noMorePosts) {
            const elementOffsetBottom:number = elementRef.current.offsetTop + elementRef.current.getBoundingClientRect().height;
            const paddedOffset:number = 100;
            const windowScrollBottom:number = window.scrollY + window.innerHeight;

            if(windowScrollBottom >= elementOffsetBottom + paddedOffset) {
                loadMore();
            }
        }
    }, 100), [page, posts, isLoading]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [onScroll]);

    return <Box bg="ghostWhite" pt={['40px', ,'50px', '60px']} pb={['120px']} ref={elementRef}>
        {
            (Array.isArray(posts) && posts.length > 0) ? <>
                <Box position="relative">
                    <Container>
                        <SimpleGrid columns={[1, 2, 3]} spacingX={[8]} spacingY={[6, ,8]} mb={[0, -8, -12]}>
                            {
                                posts.map((post:any, index:number) => {
                                    return <Box mb={[0, 8, 12]}>
                                        <PostCard {...post} key={index} />
                                    </Box>;
                                })
                            }
                        </SimpleGrid>
                    </Container>
                    {
                        <Box sx={{
                            position: 'absolute',
                            display: (noMorePosts) ? 'none' : 'block',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: ['100%'],
                            background: 'linear-gradient(0deg, rgba(248,248,248,1) 0%, rgba(255,255,255, 0) 20%)',
                            pointerEvents: 'none'
                        }} />
                    }
                </Box>
                <Box>
                    <Container>
                        {
                            couldNotLoadPosts && <Alert status="error" mt={4}>
                                <Alert status="error">Could not load posts</Alert>
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
