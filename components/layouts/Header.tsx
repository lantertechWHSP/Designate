import { ReactNode } from 'react';
import { Container, Flex, Box, Link } from '@chakra-ui/react';

interface IMenuItem {
    link: {
        title?:string;
        slug?:string;
    }
}

const Header = ({ menu }) : ReactNode => {
    return <Box as="header" py={4}>
        <Container>
            <Flex>
                <Box width={200}>
                    <Link href="/">Home</Link>
                </Box>
                <Box as="nav">
                    {
                        Array.isArray(menu) && menu.length > 0 && menu.map((item:IMenuItem, index:number) => {
                            return <Link href={item.link.slug} px={2}>{item.link.title}</Link>
                        })
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Header;
