import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text } from '@chakra-ui/react';
import { SectionLink } from '~/components/elements/sectionLink';

const Preview:any = () : ReactNode => {
    const router = useRouter();
    let slug:string = router.asPath;

    function trimSlash(str){
        str = str.startsWith('/') ? str.substr(1) : str;
        return str;
    }

    return (
        <Box width="100%" left={0} right={0} bottom={0} position="fixed" zIndex="300" background="white" height="50px" lineHeight="50px" fontSize="16px" borderTop="1px solid" borderColor="black">
            <Container>
                <Text mb={0} mr={2} as="span">
                    You are now in Preview Mode.
                </Text>
                <SectionLink href={`/api/exit-preview?redirect=${trimSlash(slug)}`} zIndex="300">
                    Click here to leave Preview Mode
                </SectionLink>
            </Container>
        </Box>
    );
};

export default Preview;
