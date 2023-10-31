import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text, Button } from '@chakra-ui/react';

const Preview:any = () : ReactNode => {
    const router = useRouter();
    let slug:string = router.asPath;

    const exit:any = () => {
        fetch(`/api/exit-preview?slug=${slug}`, {
            method: 'POST',
        }).then((response) => {
            if(response) {
                router.push(slug);
            }
        });
    }

    return (

        <Box width="100%" left={0} right={0} bottom={0} position="fixed" zIndex="300" background="white" height="50px" lineHeight="50px" fontSize="16px" borderTop="1px solid" borderColor="black">
            <Container>
                <Text mb={0} mr={2} as="span">
                    You are now in Preview Mode.
                </Text>
                <Button onClick={() => exit()} zIndex="300">
                    Click here to leave Preview Mode
                </Button>
            </Container>
        </Box>
    );
};

export default Preview;
