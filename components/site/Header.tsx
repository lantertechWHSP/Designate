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
import {motion} from 'framer-motion';
import useDocumentScroll from '~/hooks/useDocumentScroll';
import {
    enableBodyScroll,
    disableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock';
import { Icon, Icons } from '~/components/elements/icon';
import { MenuItemLink } from '~/components/elements/menuItemLink';
import { IMenuLink } from '~/interfaces/models/menuLink';
import { DatoLink } from '~/components/elements/DatoLink';

const MotionBox:any = motion(Box);

const Header:any = ({menu}): ReactNode => {
    const {isOpen, onToggle} = useDisclosure();
    const height:string = '120px';

    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isMinimumScrolled, setIsMinimumScrolled] = useState(false);

    useDocumentScroll(({previousScrollTop, currentScrollTop}) => {
        setIsScrolledDown(previousScrollTop < currentScrollTop);
        setIsMinimumScrolled(currentScrollTop > 80);
    });

    return <Box as="header" h={height}>
        <Box pos="fixed" top={0} height={[height]} w="100%" zIndex={100}
            pointerEvents={isScrolledDown && isMinimumScrolled ? 'none' : 'all'} >
            <MotionBox
                animate={{
                    opacity: !isOpen && isScrolledDown && isMinimumScrolled ? 0 : 1,
                }}>
                <Box background="steelBlue">
                    <Container>
                        <Flex h={height} py={4} align="center">
                            <Box width={200}>
                                <a href="/" style={{
                                    display: 'block',
                                    width: '130px'
                                }}>
                                    {/*<img src="/images/logo-white.svg" alt="Logo" />*/}
                                </a>
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

const DestopPopoverTrigger:any  = ({item}): ReactNode => {
    const { isOpen } = usePopoverContext();

    return <PopoverTrigger>
        <MenuItemLink variant="siteHeader"
            title={item.title}
            link={item.link}
            externalLink={item.externalLink} px={4}>
            <Flex as="span" align="baseline">
                <Text as="span" mr={2}>{item.title}</Text>
                <Box transition="transform 300ms ease"
                    transform={isOpen ? 'rotate(180deg)' : ''}>
                    <Icon icon={Icons.ChevronDown} w={12} h={12} />
                </Box>
            </Flex>
        </MenuItemLink>
    </PopoverTrigger>;
};

const DesktopNav:any = ({menu}): ReactNode => {
    return <Flex as="nav" display={['none', , , 'flex']}>
        {
            Array.isArray(menu) && menu.length > 0 && menu.map((item: IMenuLink, index: number) => {
                return Array.isArray(item.children) && item.children.length > 0 ?
                    <Popover trigger="hover" placement="bottom-start" key={index}>
                        <DestopPopoverTrigger item={item} />
                        <PopoverContent>
                            {
                                item.children && <Box background="steelBlue" py={2} px={4}>
                                    {
                                        item.children.map((child: IMenuLink, childIndex: number) => {
                                            return <Box py={2} key={childIndex}>
                                                <MenuItemLink variant="siteHeader"
                                                    title={child.title}
                                                    link={child.link}
                                                    externalLink={child.externalLink} />
                                            </Box>;
                                        })
                                    }
                                </Box>
                            }
                        </PopoverContent>
                    </Popover> : <MenuItemLink variant="siteHeader"
                        px={2}
                        key={index} title={item.title}
                        link={item.link}
                        externalLink={item.externalLink} />;
            })
        }
    </Flex>;
};

const MobileNav:any = ({menu, isOpen}): ReactNode => {
    const scrollRef:any = useRef<ReactNode>();

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
                    Array.isArray(menu) && menu.length > 0 && menu.map((item: IMenuLink, index: number) => {
                        return <MobileNavItem item={item} key={index}/>;
                    })
                }
            </Box>
        </Box>
    </MotionBox>;
};

const MobileNavItem:any = ({item}): ReactNode => {
    const {isOpen, onToggle} = useDisclosure();
    const hasChildren:boolean = Array.isArray(item.children) && item.children.length > 0;
    const handleClick:any = (hasChildren) : void => {
        if (hasChildren) {
            onToggle();
        }
        return;
    };

    return <Box>
        <Flex px={4} py={3}>
            <MenuItemLink variant="siteHeader"
                title={item.title}
                link={item.link}
                externalLink={item.externalLink} />
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
                item.children.map((child: IMenuLink, childIndex: number) => {
                    return <Box px={4} py={2} key={childIndex}>
                        <MenuItemLink variant="siteHeader"
                            title={child.title}
                            link={child.link}
                            externalLink={child.externalLink} />
                    </Box>;
                })
            }
        </Collapse>
    </Box>;
};

export default Header;
