import {ReactNode, useState, useEffect, useRef} from 'react';
import {
    Container,
    Flex,
    Box,
    Popover,
    Button,
    PopoverTrigger,
    PopoverContent,
    useDisclosure,
    usePopoverContext,
    Collapse,
    Text
} from '@chakra-ui/react';
import { Link } from '~/components/elements/link';
import {motion} from 'framer-motion';
import useDocumentScroll from 'hooks/useDocumentScroll';
import {
    enableBodyScroll,
    disableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock';
import {Icon, Icons} from '~/components/elements/icon';

interface IMenuItem {
    link: {
        title?: string;
        slug?: string;
    },
    children?: IMenuItem[];
}

const MotionBox = motion(Box);

const Header = ({menu}): ReactNode => {
    const {isOpen, onToggle} = useDisclosure();
    const height:string = '120px';

    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isMinimumScrolled, setIsMinimumScrolled] = useState(false);

    useDocumentScroll(({previousScrollTop, currentScrollTop}) => {
        setIsScrolledDown(previousScrollTop < currentScrollTop);
        setIsMinimumScrolled(currentScrollTop > 80);
    });

    return <Box as="header" h={height}>
        <Box pos="fixed" top={0} height={[height]} w="100%" zIndex={100}>
            <MotionBox
                pointerEvents={isScrolledDown && isMinimumScrolled ? 'none' : 'all'}
                animate={{
                    opacity: !isOpen && isScrolledDown && isMinimumScrolled ? 0 : 1,
                }}>
                <Box background="steelBlue">
                    <Container>
                        <Flex h={height} py={4} align="center">
                            <Box width={200}>
                                <Link href="/" variant="siteHeader">WHSP</Link>
                            </Box>
                            <DesktopNav menu={menu}/>
                            <Flex display={['flex', , , 'none']} flex={1}>
                                <Box flex={1}/>
                                <Button onClick={onToggle} color="steelBlue">
                                    {
                                        isOpen ? <Icon icon={Icons.Cross} w={20} h={20}/> : <Icon icon={Icons.Hamburger} w={20} h={20}/>
                                    }
                                </Button>
                            </Flex>
                        </Flex>
                    </Container>
                </Box>
            </MotionBox>
            <MobileNav menu={menu} isOpen={isOpen}/>
        </Box>
    </Box>;
};

const DestopPopoverTrigger = ({item}) => {
    const { isOpen } = usePopoverContext();

    return <PopoverTrigger>
        <Link variant="siteHeader" link={item} px={4} >
            <Flex as="span" align="baseline">
                <Text as="span" mr={2}>{item.link.title}</Text>
                <Box transition="transform 300ms ease"
                     transform={isOpen ? 'rotate(180deg)' : ''}>
                    <Icon icon={Icons.ChevronDown} w={12} h={12} />
                </Box>
            </Flex>
        </Link>
    </PopoverTrigger>
}

const DesktopNav = ({menu}): ReactNode => {
    return <Flex as="nav" display={['none', , , 'flex']}>
        {
            Array.isArray(menu) && menu.length > 0 && menu.map((item: IMenuItem, index: number) => {
                return Array.isArray(item.children) && item.children.length > 0 ?
                    <Popover trigger="hover" placement="bottom-start" key={index}>
                        <DestopPopoverTrigger item={item} />
                        <PopoverContent>
                            {
                                item.children && <Box background="steelBlue" py={2} px={4}>
                                    {
                                        item.children.map((child: IMenuItem, childIndex: number) => {
                                            return <Box py={2} key={childIndex}>
                                                <Link variant="siteHeader" link={child} />
                                            </Box>;
                                        })
                                    }
                                </Box>
                            }
                        </PopoverContent>
                    </Popover> : <Link variant="siteHeader" link={item} px={2} key={index} />;
            })
        }
    </Flex>;
};

const MobileNav = ({menu, isOpen}): ReactNode => {
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            if (isOpen) {
                disableBodyScroll(scrollRef.current);
            }
            else {
                enableBodyScroll(scrollRef.current);
            }
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [scrollRef, isOpen]);

    return <MotionBox
        as="nav"
        position="sticky"
        left={0}
        right={0}
        h="calc(100vh - 34px)"
        zIndex={isOpen ? 100 : 0}
        display={['block', , , 'none']}
        pointerEvents={!isOpen ? 'none' : 'all'}
        background="ghostWhite"
        opacity={0}
        animate={{
            opacity: !isOpen ? 0 : 1
        }}>
        <Box ref={scrollRef} overflowY="auto" h="100%">
            <Box>
                {
                    Array.isArray(menu) && menu.length > 0 && menu.map((item: IMenuItem, index: number) => {
                        return <MobileNavItem item={item} key={index}/>;
                    })
                }
            </Box>
        </Box>
    </MotionBox>;
};

const MobileNavItem = ({item}): ReactNode => {
    const {isOpen, onToggle} = useDisclosure();
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const handleClick = (hasChildren) : void => {
        if (hasChildren) {
            onToggle();
        }
        return;
    };

    return <Box>
        <Flex px={4} py={3}>
            <Link variant="siteHeader" link={item} />
            <Box flex={1}/>
            {
                hasChildren && <Button onClick={handleClick} color="steelBlue">
                    <Box
                        width="16px"
                        height="16px"
                        transition={'all 300ms ease'}
                        transform={isOpen ? 'rotate(180deg)' : ''}>
                        <Icon icon={Icons.ChevronDown} w={16} h={16}/>
                    </Box>
                </Button>
            }
        </Flex>
        <Collapse in={isOpen} animateOpacity>
            {
                item.children.map((child: IMenuItem, childIndex: number) => {
                    return <Box px={4} py={2} key={childIndex}>
                        <Link variant="siteHeader" link={child} />
                    </Box>;
                })
            }
        </Collapse>
    </Box>;
};

export default Header;
