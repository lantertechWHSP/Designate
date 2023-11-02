import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text, Link } from '@chakra-ui/react';

const Preview:any = () : ReactNode => {
    const router = useRouter();
    let slug:string = router.asPath;

    if(slug === '/') {
        slug = 'home'
    }
    else {
        slug = slug.startsWith('/') ? slug.substr(1) : slug;
    }

    return (
        <Box width="100%" left={0} right={0} bottom={0} position="fixed" zIndex="300" background="white" height="50px" lineHeight="50px" fontSize="16px" borderTop="1px solid" borderColor="black">
            <Container>
                <Text mb={0} mr={2} as="span">
                    You are now in Preview Mode.
                </Text>
                <Link href={`/api/exit-preview?redirect=${slug}`}>
                    Click here to leave Preview Mode
                </Link>
            </Container>
        </Box>
    );
};

export default Preview;
