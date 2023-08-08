import { ReactNode } from 'react';
import { Container, Flex, Box, Link, Popover, PopoverTrigger, PopoverContent, Portal } from '@chakra-ui/react';

interface IMenuItem {
    link: {
        title?:string;
        slug?:string;
    },
    children?:IMenuItem[];
}

const Header = ({ menu }) : ReactNode => {
    return <Box as="header" py={4} style={{
        borderBottom: '1px solid #ccc',
        background: '#f0f0f0',
    }} h="60px">
        <Container>
            <Flex>
                <Box width={200}>
                    <Link href="/">Home</Link>
                </Box>
                <Box as="nav">
                    {
                        Array.isArray(menu) && menu.length > 0 && menu.map((item:IMenuItem, index:number) => {
                            return Array.isArray(item.children) && item.children.length > 0 ? <Popover trigger="hover" placement="bottom-start" key={index}>
                                <PopoverTrigger>
                                    <Link href={`/${item.link.slug}`} px={2} key={index}>{item.link.title}</Link>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        {
                                            item.children && <Box style={{ background: '#fff', border: '1px solid #ccc' }} p={4}>
                                                {
                                                    item.children.map((child:IMenuItem, childIndex:number) => {
                                                        return <Link href={`/${child.link.slug}`} px={2} key={childIndex}>{child.link.title}</Link>
                                                    })
                                                }
                                          </Box>
                                        }
                                    </PopoverContent>
                                </Portal>
                            </Popover> : <Link href={`/${item.link.slug}`} px={2} key={index}>{item.link.title}</Link>
                        })
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Header;
