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
    Text,
    Grid,
    GridItem,
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
import { IHeader } from "~/interfaces/layout/header";

const MotionBox:any = motion(Box);

interface ISiteHeader extends IHeader {
}

const SiteHeader:any = ({ menu, darkTheme }:ISiteHeader): ReactNode => {
    const {isOpen, onToggle} = useDisclosure();
    const height:string = '120px';

    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isMinimumScrolled, setIsMinimumScrolled] = useState(false);

    useDocumentScroll(({previousScrollTop, currentScrollTop}) => {
        setIsScrolledDown(previousScrollTop < currentScrollTop);
        setIsMinimumScrolled(currentScrollTop > 80);
    });


    let getBackground = () => {
        if(isOpen || (!isScrolledDown && isMinimumScrolled)) {
            return 'white';
        }
        else {
            if(darkTheme) {
                return 'rgba(0, 0, 0, 0)';
            }
            else {
                return 'white';
            }
        }
    }

    let getColor = () => {
        if(isOpen || (!isScrolledDown && isMinimumScrolled)) {
            return 'black'
        }
        else {
            if(darkTheme) {
                return 'white';
            }
            else {
                return 'black'
            }
        }
    }

    const [background, setBackground] = useState(getBackground());
    const [color, setColor] = useState(getColor());

    useEffect(() => {
        setColor(getColor());
        setBackground(getBackground());
    }, [isOpen, isScrolledDown, isMinimumScrolled])

    return <Box as="header">
        <Box pos="fixed" top={0} height={[height]} w="100%" zIndex={100}
            pointerEvents={isScrolledDown && isMinimumScrolled ? 'none' : 'all'} >
            <MotionBox
                animate={{
                    opacity: !isOpen && isScrolledDown && isMinimumScrolled ? 0 : 1,
                }}>
                <Box background={background}
                     transition="background 300ms linear">
                    <Container>
                        <Flex h={height} py={4} align="center">
                            <Grid templateColumns='repeat(12, 1fr)' width="100%">
                                <GridItem colSpan={[3]}>
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
                                                 transition="color 300ms linear"
                                                 color={color}>
                                                <Logo />
                                            </Box>
                                        </Link>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={7} display={['none', , , 'flex']}>
                                    <DesktopNav menu={menu} color={color}/>
                                </GridItem>
                                <GridItem colSpan={[9, , ,2]}>
                                    <Flex display={['flex', , , 'none']} flex={1}>
                                        <Button onClick={onToggle} color="steelBlue">
                                            {
                                                isOpen ? <Icon icon={Icons.Cross} w={20} h={20}/> : <Icon icon={Icons.Hamburger} w={20} h={20}/>
                                            }
                                        </Button>
                                    </Flex>
                                    <Link href="/contact" sx={{
                                        color: color,
                                        fontWeight: 700,
                                        minWidth: 200,
                                        padding: '0 20px',
                                        lineHeight: '48px',
                                        height: '48px',
                                        border: `1px solid ${color === 'white' ? `rgba(255, 255, 255, 0.5)` : `rgba(0, 0, 0, 0.5)`}`,
                                        borderRadius: '24px',
                                        display: 'block',
                                        textAlign: 'center'
                                    }}>
                                        Contact
                                    </Link>
                                </GridItem>
                            </Grid>
                        </Flex>
                    </Container>
                </Box>
            </MotionBox>
            <MobileNav menu={menu} isOpen={isOpen}/>
        </Box>
    </Box>;
};

const DestopPopoverTrigger:any  = ({item, color}): ReactNode => {
    const { isOpen } = usePopoverContext();

    return <PopoverTrigger>
        <MenuItemLink variant="siteHeader"
                      color={color}
                      title={item.title}
                      ink={item.link}
                      externalLink={item.externalLink}
                      px={5}>
            <Flex as="span" align="baseline">
                <Text as="span" mr={2}>{item.title}</Text>
                <Box transition="transform 300ms ease"
                    transform={isOpen ? 'rotate(180deg)' : ''}>
                    <Icon icon={Icons.WideArrowDown} w={12} h={12} />
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
                    <Popover trigger="hover" placement="bottom-start" key={index}>
                        <DestopPopoverTrigger item={item} color={color} />
                        <PopoverContent>
                            {
                                item.children && <Box background="steelBlue" py={2} px={3}>
                                    {
                                        item.children.map((child: IMenuLink, childIndex: number) => {
                                            return <Box py={2} key={childIndex}>
                                                <MenuItemLink
                                                    variant="siteHeader"
                                                    color={color}
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

export default SiteHeader;
