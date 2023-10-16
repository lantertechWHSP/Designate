import { ReactNode } from 'react';
import { Container, Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { resolveInternalLink } from '~/lib/utils';
import { MenuItemLink } from "~/components/elements/menuItemLink";

const PageLinks:any = ({ current }:any) : ReactNode => {
    const router:any = useRouter();

    if (!current?.children.length) return null;

    const links:any = current.children.filter(
        (link) => resolveInternalLink(link.href) !== router.asPath
    );

    return (
        <Box py={[6, 8, 12]} background="ghostWhite2">
            <Container>
                <Heading variant="pageLinksHeading" mb={4}>
                    See Also
                </Heading>
                {
                    links.map((link, index) => {
                        return <Box key={index} py={1}>
                            <MenuItemLink title={link.title}
                                link={link.link}
                                externalLink={link.externalLink}
                                fontSize={24}
                                fontWeight={500} />
                        </Box>;
                    })
                }
            </Container>
        </Box>
    );
};

export default PageLinks;
