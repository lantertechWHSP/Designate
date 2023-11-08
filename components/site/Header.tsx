import { ReactNode, useState, useEffect, useRef, useMemo } from 'react';
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
    Text,
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
import Logo from "~/components/site/Logo";
import { Link } from '~/components/elements/link';
import { IHeader as IDatoHeader } from "~/interfaces/layout/header";
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";

const MotionBox:any = motion(Box);

interface IHeader extends IDatoHeader {
}

const Header:any = ({ menu, darkTheme }:IHeader): ReactNode => {
    const { isOpen, onToggle } = useDisclosure();
    const height:string = '120px';

    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isMinimumScrolled, setIsMinimumScrolled] = useState(false);

    useDocumentScroll(({previousScrollTop, currentScrollTop}) => {
        setIsScrolledDown(previousScrollTop < currentScrollTop);
        setIsMinimumScrolled(currentScrollTop > 80);
    });


    const background:any = useMemo(() => {
        if(isOpen || (!isScrolledDown && isMinimumScrolled)) {
            return 'rgba(255, 255, 255, 1)';
        }
        else {
            return 'rgba(0, 0, 0, 0)';
        }
    }, [isOpen, isScrolledDown, isMinimumScrolled, darkTheme]);

    const color:any = useMemo(() => {
        if(isOpen || (!isScrolledDown && isMinimumScrolled)) {
            return '#1C1C1C';
        }
        else {
            if(darkTheme) {
                return '#ffffff';
            }
            else {
                return '#1C1C1C';
            }
        }
    }, [isOpen, isScrolledDown, isMinimumScrolled, darkTheme]);

    return <Box as="header">
        <Box pos="fixed" top={0} height={[height]} w="100%" zIndex={100}
            pointerEvents={isScrolledDown && isMinimumScrolled ? 'none' : 'all'} >
            <MotionBox
                animate={{
                    opacity: !isOpen && isScrolledDown && isMinimumScrolled ? 0 : 1,
                    background: background
                }}
                transition={{
                    ease: 'linear',
                    duration: 0.3
                }}>
                <Container>
                    <Row height={[height]} align="center">
                        <Column width={[ColumnWidth.Half, , , ,ColumnWidth.TwoTwelfths]}>
                            <Flex height="48px" align="center">
                                <Link
                                    href="/"
                                    sx={{
                                        display: 'block',
                                        width: '188px',
                                        position: 'relative',
                                        top: '-3px'
                                    }}>
                                    <Box as="span"
                                        color={color}>
                                        <Logo />
                                    </Box>
                                </Link>
                            </Flex>
                        </Column>
                        <Column display={['none', , , ,'flex']} align="center" width={[ColumnWidth.None, , ,ColumnWidth.EightTwelfths]}>
                            <DesktopNav menu={menu} color={color}/>
                        </Column>
                        <Column width={[ColumnWidth.Half, , , ,ColumnWidth.TwoTwelfths]}>
                            <Flex display="flex" justify="flex-end">
                                <Button color={color} onClick={onToggle} display={['flex', , , ,'none']}>
                                    {
                                        isOpen ? <Icon icon={Icons.StickyMenuClose} w={34} h={34}/> : <Icon icon={Icons.StickyMenuHamburger} w={34} h={34}/>
                                    }
                                </Button>
                                <Link display={['none', , , ,'block']}
                                    href="/contact" sx={{
                                        color: color,
                                        fontWeight: 700,
                                        minWidth: ['120px', ,'180px'],
                                        padding: '0 20px',
                                        lineHeight: '48px',
                                        height: '48px',
                                        border: color === '#1C1C1C' ? '2px solid rgba(28, 28, 28, 0.1)' : '2px solid rgba(255, 255, 255, 0.2)',
                                        transition: 'border 0.3s ease-in',
                                        _hover: {
                                            border: `2px solid ${color}`,
                                        },
                                        fontSize: '16px',
                                        borderRadius: '24px',
                                        textAlign: 'center'
                                    }}>
                                    Contact
                                </Link>
                            </Flex>
                        </Column>
                    </Row>
                </Container>
            </MotionBox>
            <MobileNav background={background} menu={menu} isOpen={isOpen}/>
        </Box>
    </Box>;
};

const DestopPopoverTrigger:any  = ({item, color, isLast}): ReactNode => {
    const { isOpen } = usePopoverContext();

    return <PopoverTrigger>
        <MenuItemLink variant="siteHeader"
            color={color}
            title={item.title}
            ink={item.link}
            mr={!isLast ? 10 : 0}
            externalLink={item.externalLink}>
            <Flex as="span" align="baseline">
                <Text as="span" mr={2}>{item.title}</Text>
                <Box transition="transform 300ms linear"
                    position="relative"
                    top="1px"
                    transform={isOpen ? 'rotate(180deg)' : ''}>
                    <Icon icon={Icons.WideTriangleDown} w={12} h={12} />
                </Box>
            </Flex>
        </MenuItemLink>
    </PopoverTrigger>;
};

const DesktopNav:any = ({menu, color}): ReactNode => {
    return <Flex as="nav"  height="48px" align="center">
        {
            Array.isArray(menu) && menu.length > 0 && menu.map((item: IMenuLink, index: number) => {
                return Array.isArray(item.children) && item.children.length > 0 ?
                    <Popover trigger="hover" placement="bottom-start" key={index} closeOnBlur={true}>
                        <DestopPopoverTrigger item={item} color={color} isLast={index === menu.length - 1} />
                        <PopoverContent>
                            {
                                item.children && <Box background="white" py={2} px={3}>
                                    {
                                        item.children.map((child: IMenuLink, childIndex: number) => {
                                            return <Box py={2} key={childIndex}>
                                                <MenuItemLink
                                                    variant="siteHeader"
                                                    color="charcoal"
                                                    title={child.title}
                                                    link={child.link}
                                                    externalLink={child.externalLink} />
                                            </Box>;
                                        })
                                    }
                                </Box>
                            }
                        </PopoverContent>
                    </Popover> : <MenuItemLink
                        variant="siteHeader"
                        color={color}
                        px={5}
                        key={index} title={item.title}
                        link={item.link}
                        externalLink={item.externalLink} />;
            })
        }
    </Flex>;
};

const MobileNav:any = ({ background, menu, isOpen = false }): ReactNode => {
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
        h={'calc(100vh - 120px)'}
        zIndex={isOpen ? 100 : 0}
        pointerEvents={!isOpen ? 'none' : 'all'}
        animate={{
            opacity: !isOpen ? 0 : 1,
            background: background
        }}
        transition={{
            ease: 'linear',
            duration: 0.3
        }}>
        <Box ref={scrollRef} overflowY="auto" h={isOpen ? '100%' : '0'}>
            <Box color="charcoal">
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
        <Flex px={['16px', '24px', '32px']} py={3} borderTop="1px solid" cursor={hasChildren ? 'pointer' : 'auto'} onClick={handleClick}  borderColor="borderColor">
            <MenuItemLink variant="siteHeader"
                color="charcoal"
                fontSize="18px"
                link={item.link}
                externalLink={item.externalLink} >
                {item.title}
            </MenuItemLink>
            <Box flex={1}/>
            {
                hasChildren && <Button color="charcoal">
                    <Box
                        width="12px"
                        height="12px"
                        transition={'transform 300ms linear'}
                        transform={isOpen ? 'rotate(180deg)' : ''}>
                        <Icon icon={Icons.ChevronDown} w={12} h={12}/>
                    </Box>
                </Button>
            }
        </Flex>
        {
            hasChildren && <Collapse in={isOpen} animateOpacity>
                <Box borderTop="1px solid" borderColor="borderColor">
                    {
                        item.children.map((child: IMenuLink, childIndex: number) => {
                            return <Box px={['16px', '24px', '32px']} py={2} key={childIndex}>
                                <MenuItemLink variant="siteHeader"
                                    color="olive"
                                    link={child.link}
                                    externalLink={child.externalLink} >
                                    {child.title}
                                </MenuItemLink>
                            </Box>;
                        })
                    }
                </Box>
            </Collapse>
        }
    </Box>;
};

export default Header;
