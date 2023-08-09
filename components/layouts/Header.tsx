import { ReactNode, useState } from 'react';
import { Container, Flex, Box, Popover, Link, PopoverTrigger, PopoverContent, useDisclosure } from '@chakra-ui/react';
import { DatoLink } from '~/components/elements/datoLink';
import { motion } from 'framer-motion';
import useDocumentScroll from 'hooks/useDocumentScroll';

interface IMenuItem {
    link: {
        title?:string;
        slug?:string;
    },
    children?:IMenuItem[];
}

const MotionBox = motion(Box);

const Header = ({ menu }) : ReactNode => {
    const { isOpen } = useDisclosure();

    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isMinimumScrolled, setIsMinimumScrolled] = useState(false);

    useDocumentScroll(({ previousScrollTop, currentScrollTop }) => {
        setIsScrolledDown(previousScrollTop < currentScrollTop);
        setIsMinimumScrolled(currentScrollTop > 80);
    });

    return <Box as="header" h={"60px"}>
        <Box pos="fixed" top={0} height={['60px']} w="100%" zIndex={100}>
            <MotionBox
                pointerEvents={isScrolledDown && isMinimumScrolled ? 'none' : 'all'}
                animate={{
                    opacity: !isOpen && isScrolledDown && isMinimumScrolled ? 0 : 1,
                }}>
                <DesktopNav menu={menu} />
            </MotionBox>
        </Box>
    </Box>;
};

const DesktopNav = ({menu}) : ReactNode => {
    return <Box py={4} style={{
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
                                    <DatoLink {...item} px={2} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    {
                                        item.children && <Box style={{ background: '#fff', border: '1px solid #ccc' }} py={2} px={4}>
                                            {
                                                item.children.map((child:IMenuItem, childIndex:number) => {
                                                    return <Box py={2} key={childIndex}>
                                                        <DatoLink {...child} />
                                                    </Box>;
                                                })
                                            }
                                        </Box>
                                    }
                                </PopoverContent>
                            </Popover> : <DatoLink {...item} px={2} key={index} />;
                        })
                    }
                </Box>
            </Flex>
        </Container>
    </Box>;
};

export default Header;
