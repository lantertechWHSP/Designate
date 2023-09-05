import { ReactNode } from 'react';
import { Container, Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { resolveInternalLink } from 'lib/utils';
import { DatoLink } from '~/components/elements/datoLink';

const PageLinks = ({ current }) : ReactNode => {
    const router = useRouter();

    if (!current?.children.length) return null;

    const links = current.children.filter(
        (link) => resolveInternalLink(link.href) !== router.asPath
    );

    return (
        <Box py={[8, ,12]} background="ghostWhite2">
            <Container>
                <Heading variant="pageLinksHeading" mb={4}>
                    See Also
                </Heading>
                {
                    links.map((link, index) => {
                        return <Box key={index} py={1}>
                            <DatoLink link={link} fontSize={24} fontWeight={500} />
                        </Box>;
                    })
                }
            </Container>
        </Box>
    );
};

export default PageLinks;
