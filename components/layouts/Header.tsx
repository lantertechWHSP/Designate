import { ReactNode } from 'react';
import { Container, Flex, Box, Popover, Link, PopoverTrigger, PopoverContent, Portal } from '@chakra-ui/react';
import { DatoLink } from '~/components/elements/datoLink';

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
                                    <DatoLink {...item} px={2} key={index} />
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        {
                                            item.children && <Box style={{ background: '#fff', border: '1px solid #ccc' }} py={2} px={4}>
                                                {
                                                    item.children.map((child:IMenuItem, childIndex:number) => {
                                                        return <Box py={2}>
                                                            <DatoLink {...child} key={childIndex} />
                                                        </Box>;
                                                    })
                                                }
                                            </Box>
                                        }
                                    </PopoverContent>
                                </Portal>
                            </Popover> : <DatoLink {...item} px={2} key={index} />;
                        })
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Header;
